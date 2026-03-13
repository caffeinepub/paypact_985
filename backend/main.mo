import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Nat "mo:core/Nat";

actor {
  type User = {
    id : Principal;
    username : Text;
  };

  type Pact = {
    name : Text;
    currency : Text;
    createdAt : Int;
    createdBy : Principal;
    isActive : Bool;
  };

  type ImageData = {
    data : Blob;
    contentType : Text;
  };

  type Bill = {
    id : Nat;
    createdBy : Principal;
    name : Text;
    amount : Nat;
    participants : [Principal];
    createdAt : Int;
    isImage : Bool;
  };

  type Debt = {
    debtor : User;
    creditor : User;
    amount : Int;
  };

  type UserSummary = {
    participant : User;
    bills : [{ name : Text; amount : Int; payer : User }];
    total : Int;
    spent : Int;
    debts : [Debt];
  };

  type PaidBill = { name : Text; amount : Int; payer : User };

  var index : Nat = 0;
  var pact : ?Pact = null;
  var bills : Map.Map<Nat, Bill> = Map.empty<Nat, Bill>();
  var users : Map.Map<Principal, User> = Map.empty<Principal, User>();
  var images : Map.Map<Nat, ImageData> = Map.empty<Nat, ImageData>();

  public shared ({ caller }) func initPact(name : Text, currency : Text, username : Text) : async () {
    Guards.requireAuth(caller);
    Guards.requireValidName([name, username]);

    if (pact != null) {
      Runtime.trap("Pact already initialized");
    };

    pact := ?{
      name;
      currency;
      createdAt = Time.now();
      createdBy = caller;
      isActive = true;
    };

    let user : User = { id = caller; username };
    users.add(caller, user);
  };

  public shared func getPact() : async Pact {
    switch (pact) {
      case (null) { Runtime.trap("Pact not initialized") };
      case (?pact) { pact };
    };
  };

  public shared ({ caller }) func addUser(id : Principal, username : Text) : async User {
    Guards.requireAuth(caller);
    Guards.requirePact();
    Guards.requireValidName([username]);
    Guards.requiredPactActive();
    if (users.containsKey(id)) {
      Runtime.trap("User already in pact " # id.toText());
    };
    let user : User = { id; username };
    users.add(id, user);
    user;
  };

  public shared ({ caller }) func addUserSelf(username : Text) : async () {
    Guards.requireAuth(caller);
    Guards.requirePact();
    Guards.requireValidName([username]);
    Guards.requiredPactActive();

    switch (users.get(caller)) {
      case (null) {
        let user : User = { id = caller; username };
        users.add(caller, user);
      };
      case (_) {
        Runtime.trap("User already in pact");
      };
    };
  };

  public shared (_) func getAllUsers() : async [User] {
    Guards.requirePact();

    users.values().toArray();
  };

  public shared ({ caller }) func addBill(
    name : Text,
    amount : Nat,
    participants : [Principal],
    image : ?ImageData,
  ) : async Bill {
    Guards.requirePact();
    Guards.requireValidName([name]);
    Guards.requireUserExists(caller);
    Guards.requiredPactActive();
    for (participant in participants.values()) {
      Guards.requireUserExists(participant);
    };
    let id = getNextIndex();
    var isImage = false;
    switch (image) {
      case (?imageData) {
        images.add(id, imageData);
        isImage := true;
      };
      case (null) {
        isImage := false;
      };
    };
    let bill : Bill = {
      id;
      name;
      amount;
      participants;
      createdAt = Time.now();
      createdBy = caller;
      isImage;
    };
    bills.add(bill.id, bill);
    bill;
  };

  public shared ({ caller }) func getBillById(id : Nat) : async Bill {
    Guards.requirePact();
    Guards.requireUserExists(caller);

    switch (bills.get(id)) {
      case (null) { Runtime.trap("Bill not found") };
      case (?bill) { bill };
    };
  };

  public shared ({ caller }) func removeBillById(id : Nat) : async () {
    Guards.requirePact();
    Guards.requireUserExists(caller);
    Guards.requiredPactActive();

    if (not bills.containsKey(id)) {
      Runtime.trap("Bill not found");
    };
    bills.remove(id);
  };

  public shared ({ caller }) func getAllBills() : async [Bill] {
    Guards.requirePact();
    Guards.requireUserExists(caller);

    bills.values().toArray();
  };

  public shared ({ caller }) func getImageByBillId(id : Nat) : async ImageData {
    Guards.requirePact();
    Guards.requireUserExists(caller);

    switch (bills.get(id)) {
      case (null) { Runtime.trap("Bill not found") };
      case (?bill) {
        if (bill.isImage) {
          return switch (images.get(id)) {
            case (null) { Runtime.trap("This bill has no image") };
            case (?image) { image };
          };
        };
      };
    };
    switch (images.get(id)) {
      case (null) { Runtime.trap("Image not found") };
      case (?image) { image };
    };
  };

  public shared ({ caller }) func settle() : async Pact {
    Guards.requirePact();
    Guards.requireUserExists(caller);
    Guards.requiredPactActive();

    switch (pact) {
      case (null) { Runtime.trap("Pact not initialized") };
      case (?initedPact) {
        let inactivePact = { initedPact with isActive = false };
        pact := ?inactivePact;
        inactivePact;
      };
    };
  };

  public shared ({ caller }) func summary() : async [UserSummary] {
    Guards.requirePact();
    Guards.requireUserExists(caller);

    let result = List.empty<UserSummary>();
    let debts = calculateFinalDebts();

    for ((_, user) in users.entries()) {
      var userBills = List.empty<PaidBill>();
      var total : Int = 0;
      var spent : Int = 0;
      var userDebts = List.empty<Debt>();

      for ((_, bill) in bills.entries()) {
        if (bill.participants.find(func(p) { p == user.id }) != null) {
          let share = bill.amount / bill.participants.size();
          userBills.add({
            name = bill.name;
            amount = share;
            payer = getUser(bill.createdBy);
          });
          total += share;
        };
      };

      for (debt in debts.values()) {
        if (debt.debtor.id == user.id or debt.creditor.id == user.id) {
          userDebts.add(debt);
        };
        if (debt.debtor.id == user.id) {
          spent -= debt.amount;
        } else if (debt.creditor.id == user.id) {
          spent += debt.amount;
        };
      };

      result.add({
        participant = user;
        bills = userBills.toArray();
        total;
        spent;
        debts = userDebts.toArray();
      });
    };

    result.toArray();
  };

  func calculateFinalDebts() : [Debt] {
    let balances = Map.empty<Principal, Int>();
    for (user in users.values()) {
      balances.add(user.id, 0);
    };
    for (bill in bills.values()) {
      let share = bill.amount / bill.participants.size();
      for (participant in bill.participants.values()) {
        let prev = switch (balances.get(participant)) {
          case (?v) { v };
          case (null) { 0 };
        };
        balances.add(participant, prev - share);
      };
      let prevPayer = switch (balances.get(bill.createdBy)) {
        case (?v) { v };
        case (null) { 0 };
      };
      balances.add(bill.createdBy, prevPayer + bill.amount);
    };

    let debtors = List.empty<(Principal, Int)>();
    let creditors = List.empty<(Principal, Int)>();
    for ((id, balance) in balances.entries()) {
      if (balance < 0) {
        debtors.add((id, -balance));
      } else if (balance > 0) {
        creditors.add((id, balance));
      };
    };

    let result = List.empty<Debt>();
    var depitorIndex = 0;
    var creditorIndex = 0;
    while (depitorIndex < debtors.size() and creditorIndex < creditors.size()) {
      let (debtor, debtAmt) = debtors.at(depitorIndex);
      let (creditor, credAmt) = creditors.at(creditorIndex);
      let pay = if (debtAmt < credAmt) { debtAmt } else { credAmt };
      result.add({
        debtor = getUser(debtor);
        creditor = getUser(creditor);
        amount = pay;
      });
      let newDebt = debtAmt - pay;
      let newCred = credAmt - pay;
      if (newDebt > 0) {
        debtors.put(depitorIndex, (debtor, newDebt));
        creditorIndex += 1;
      } else if (newCred > 0) {
        creditors.put(creditorIndex, (creditor, newCred));
        depitorIndex += 1;
      } else {
        depitorIndex += 1;
        creditorIndex += 1;
      };
    };
    result.toArray();
  };

  func getUser(id : Principal) : User {
    switch (users.get(id)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) { user };
    };
  };

  func getNextIndex() : Nat {
    index += 1;
    index;
  };

  module Guards {
    public func requireAuth(caller : Principal) {
      if (caller.isAnonymous()) { Runtime.trap("Unauthorized: anonymous user") };
    };

    public func requirePact() {
      if (pact == null) { Runtime.trap("Pact not initialized") };
    };

    public func requiredPactActive() {
      switch (pact) {
        case (null) { Runtime.trap("Pact not initialized") };
        case (?p) {
          if (p.isActive == false) { Runtime.trap("Pact is not active") };
        };
      };
    };

    public func requireUserExists(participant : Principal) {
      if (users.get(participant) == null) {
        Runtime.trap("Unauthorized: user not in pact " # participant.toText());
      };
    };

    public func requireValidName(names : [Text]) {
      for (name in names.values()) {
        if (name.size() < 3 or name.size() > 20) {
          Runtime.trap("Name must be between 3 and 20 characters: " # name);
        };
      };
    };
  };
};
