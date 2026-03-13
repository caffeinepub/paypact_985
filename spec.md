# Paypact - Smart Expense Splitting DApp

## Overview

Paypact is a decentralized application (DApp) built on the Internet Computer that enables groups to efficiently split expenses and settle debts. Users can create expense-sharing "pacts", add bills, track spending, and calculate fair settlements among participants.

## Features

### Core Functionality

- **Pact Creation**: Create named expense groups with selected currency
- **Multi-User Support**: Invite and manage multiple participants via Internet Identity
- **Bill Management**: Add, view, and delete expense bills with optional photo attachments
- **Smart Calculations**: Automatic expense splitting and debt calculation
- **Settlement System**: Calculate optimal debt resolution between participants
- **Image Attachments**: Upload and view bill photos for transparency

### User Experience

- **Step-Based Navigation**: Intuitive workflow through pact creation, management, and settlement
- **Responsive Design**: Works across desktop and mobile devices
- **Real-Time Updates**: Synchronized data across all participants
- **Share & Invite**: Easy invite link generation for new participants

## Technical Architecture

### Backend (Motoko)

- **actor**: Maintains state across canister upgrades
- **User Management**: Principal-based user identification and authentication
- **Data Models**: Structured types for Pacts, Bills, Users, and financial calculations
- **Security**: Role-based access control and input validation
- **File Storage**: Blob storage for bill images with content type validation

### Frontend (React + TypeScript)

- **Component Architecture**: Modular React components for each workflow step
- **State Management**: React hooks and context for application state
- **Styling**: Tailwind CSS for responsive and consistent design
- **Form Handling**: Controlled forms with validation
- **File Upload**: Image attachment with preview and compression

### Key Data Models

#### Pact

```motoko
type Pact = {
  name : Text;
  currency : Text;
  createdAt : Int;
  createdBy : Principal;
  isActive : Bool;
};

```

#### Bill

```motoko
type Bill = {
  id : Nat;
  createdBy : Principal;
  name : Text;
  amount : Nat;
  participants : [Principal];
  createdAt : Int;
  isImage : Bool;
};

```

#### User

```motoko
type User = {
  id : Principal;
  username : Text;
};

```

## Workflows

### 1. Pact Creation

1. User authenticates via Internet Identity
2. Enters pact name, personal name, and currency
3. System creates pact and adds user as creator
4. User can invite others via shareable link

### 2. Joining a Pact

1. New user clicks invite link
2. Authenticates via Internet Identity
3. Enters their name to join the pact
4. System adds user to participant list

### 3. Bill Management

1. Authenticated pact members can add bills
2. Enter bill name, amount, and select participants
3. Optionally attach bill photo
4. System calculates individual shares
5. Bills can be viewed, detailed, or deleted

### 4. Financial Tracking

1. **Bills Tab**: List of all expenses with payer information
2. **Summary Tab**: Detailed breakdown per participant showing:
   - Bills paid by user
   - User's consumption/share
   - Net amount owed or owed to them
   - Specific debt relationships

### 5. Settlement

1. Pact creator can initiate settlement
2. System calculates optimal debt resolution
3. Displays who owes whom and amounts
4. Pact becomes inactive after settlement
5. Share settlement summary with participants

## Security Features

- **Internet Identity Integration**: Secure, anonymous authentication
- **Principal-based Authorization**: All actions tied to authenticated principals
- **Input Validation**: Server-side validation of all user inputs
- **Access Control**: Only pact members can view/modify pact data
- **File Validation**: Image uploads validated for type and size limits

## Currency Support

Supports 170+ international currencies including:

- Major currencies (USD, EUR, GBP, JPY, etc.)
- Regional currencies (AED, INR, CAD, AUD, etc.)
- Emerging market currencies
- Full currency name display for clarity

## Technical Requirements

### Dependencies

- Internet Computer SDK (DFX)
- React 19+
- TypeScript 5+
- Tailwind CSS 3+
- Vite build system
- Internet Identity integration

### Browser Compatibility

- Modern browsers with WebAssembly support
- Mobile browsers (iOS Safari, Chrome Mobile)
- WebCrypto API support for authentication

## Deployment

The DApp consists of:

1. **Backend Canister**: Motoko smart contract with business logic
2. **Frontend Assets**: React SPA served from asset canister
3. **Internet Identity**: External service for authentication

## Future Enhancements

- **Recurring Bills**: Support for repeating expenses
- **Categories**: Bill categorization and filtering
- **Export Features**: PDF reports and CSV export
- **Multi-Currency**: Support for mixed currency pacts
- **Payment Integration**: Direct payment processing
- **Notifications**: Real-time updates and reminders
