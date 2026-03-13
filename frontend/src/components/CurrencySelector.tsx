import React, { useState, useRef, useEffect } from "react";

interface Currency {
  code: string;
  name: string;
}

const currencies: Currency[] = [
  { code: "aed", name: "United Arab Emirates Dirham" },
  { code: "afn", name: "Afghan Afghani" },
  { code: "all", name: "Albanian Lek" },
  { code: "amd", name: "Armenian Dram" },
  { code: "ang", name: "Netherlands Antillean Guilder" },
  { code: "aoa", name: "Angolan Kwanza" },
  { code: "ars", name: "Argentine Peso" },
  { code: "aud", name: "Australian Dollar" },
  { code: "awg", name: "Aruban Florin" },
  { code: "azn", name: "Azerbaijani Manat" },
  { code: "bam", name: "Bosnia-Herzegovina Convertible Mark" },
  { code: "bbd", name: "Barbadian Dollar" },
  { code: "bdt", name: "Bangladeshi Taka" },
  { code: "bgn", name: "Bulgarian Lev" },
  { code: "bhd", name: "Bahraini Dinar" },
  { code: "bif", name: "Burundian Franc" },
  { code: "bmd", name: "Bermudian Dollar" },
  { code: "bnd", name: "Brunei Dollar" },
  { code: "bob", name: "Bolivian Boliviano" },
  { code: "brl", name: "Brazilian Real" },
  { code: "bsd", name: "Bahamian Dollar" },
  { code: "btn", name: "Bhutanese Ngultrum" },
  { code: "bwp", name: "Botswana Pula" },
  { code: "byn", name: "Belarusian Ruble" },
  { code: "bzd", name: "Belize Dollar" },
  { code: "cad", name: "Canadian Dollar" },
  { code: "cdf", name: "Congolese Franc" },
  { code: "chf", name: "Swiss Franc" },
  { code: "clp", name: "Chilean Peso" },
  { code: "cny", name: "Chinese Yuan" },
  { code: "cop", name: "Colombian Peso" },
  { code: "crc", name: "Costa Rican Colón" },
  { code: "cup", name: "Cuban Peso" },
  { code: "cve", name: "Cape Verdean Escudo" },
  { code: "czk", name: "Czech Koruna" },
  { code: "djf", name: "Djiboutian Franc" },
  { code: "dkk", name: "Danish Krone" },
  { code: "dop", name: "Dominican Peso" },
  { code: "dzd", name: "Algerian Dinar" },
  { code: "egp", name: "Egyptian Pound" },
  { code: "ern", name: "Eritrean Nakfa" },
  { code: "etb", name: "Ethiopian Birr" },
  { code: "eur", name: "Euro" },
  { code: "fjd", name: "Fijian Dollar" },
  { code: "fkp", name: "Falkland Islands Pound" },
  { code: "fok", name: "Faroese Króna" },
  { code: "gbp", name: "British Pound Sterling" },
  { code: "gel", name: "Georgian Lari" },
  { code: "ghs", name: "Ghanaian Cedi" },
  { code: "gip", name: "Gibraltar Pound" },
  { code: "gmd", name: "Gambian Dalasi" },
  { code: "gnf", name: "Guinean Franc" },
  { code: "gtq", name: "Guatemalan Quetzal" },
  { code: "gyd", name: "Guyanese Dollar" },
  { code: "hkd", name: "Hong Kong Dollar" },
  { code: "hnl", name: "Honduran Lempira" },
  { code: "hrk", name: "Croatian Kuna" },
  { code: "htg", name: "Haitian Gourde" },
  { code: "huf", name: "Hungarian Forint" },
  { code: "idr", name: "Indonesian Rupiah" },
  { code: "ils", name: "Israeli New Shekel" },
  { code: "inr", name: "Indian Rupee" },
  { code: "iqd", name: "Iraqi Dinar" },
  { code: "irr", name: "Iranian Rial" },
  { code: "isk", name: "Icelandic Króna" },
  { code: "jmd", name: "Jamaican Dollar" },
  { code: "jod", name: "Jordanian Dinar" },
  { code: "jpy", name: "Japanese Yen" },
  { code: "kes", name: "Kenyan Shilling" },
  { code: "kgs", name: "Kyrgyzstani Som" },
  { code: "khr", name: "Cambodian Riel" },
  { code: "kmf", name: "Comorian Franc" },
  { code: "kpw", name: "North Korean Won" },
  { code: "krw", name: "South Korean Won" },
  { code: "kwd", name: "Kuwaiti Dinar" },
  { code: "kyd", name: "Cayman Islands Dollar" },
  { code: "kzt", name: "Kazakhstani Tenge" },
  { code: "lak", name: "Lao Kip" },
  { code: "lbp", name: "Lebanese Pound" },
  { code: "lkr", name: "Sri Lankan Rupee" },
  { code: "lrd", name: "Liberian Dollar" },
  { code: "lsl", name: "Lesotho Loti" },
  { code: "lyd", name: "Libyan Dinar" },
  { code: "mad", name: "Moroccan Dirham" },
  { code: "mdl", name: "Moldovan Leu" },
  { code: "mga", name: "Malagasy Ariary" },
  { code: "mkd", name: "Macedonian Denar" },
  { code: "mmk", name: "Myanmar Kyat" },
  { code: "mnt", name: "Mongolian Tögrög" },
  { code: "mop", name: "Macanese Pataca" },
  { code: "mru", name: "Mauritanian Ouguiya" },
  { code: "mur", name: "Mauritian Rupee" },
  { code: "mvr", name: "Maldivian Rufiyaa" },
  { code: "mwk", name: "Malawian Kwacha" },
  { code: "mxn", name: "Mexican Peso" },
  { code: "myr", name: "Malaysian Ringgit" },
  { code: "mzn", name: "Mozambican Metical" },
  { code: "nad", name: "Namibian Dollar" },
  { code: "ngn", name: "Nigerian Naira" },
  { code: "nio", name: "Nicaraguan Córdoba" },
  { code: "nok", name: "Norwegian Krone" },
  { code: "npr", name: "Nepalese Rupee" },
  { code: "nzd", name: "New Zealand Dollar" },
  { code: "omr", name: "Omani Rial" },
  { code: "pab", name: "Panamanian Balboa" },
  { code: "pen", name: "Peruvian Sol" },
  { code: "pgk", name: "Papua New Guinean Kina" },
  { code: "php", name: "Philippine Peso" },
  { code: "pkr", name: "Pakistani Rupee" },
  { code: "pln", name: "Polish Zloty" },
  { code: "pyg", name: "Paraguayan Guarani" },
  { code: "qar", name: "Qatari Riyal" },
  { code: "ron", name: "Romanian Leu" },
  { code: "rsd", name: "Serbian Dinar" },
  { code: "rub", name: "Russian Ruble" },
  { code: "rwf", name: "Rwandan Franc" },
  { code: "sar", name: "Saudi Riyal" },
  { code: "sbd", name: "Solomon Islands Dollar" },
  { code: "scr", name: "Seychellois Rupee" },
  { code: "sdg", name: "Sudanese Pound" },
  { code: "sek", name: "Swedish Krona" },
  { code: "sgd", name: "Singapore Dollar" },
  { code: "shp", name: "Saint Helena Pound" },
  { code: "sll", name: "Sierra Leonean Leone" },
  { code: "sos", name: "Somali Shilling" },
  { code: "srd", name: "Surinamese Dollar" },
  { code: "ssp", name: "South Sudanese Pound" },
  { code: "stn", name: "São Tomé and Príncipe Dobra" },
  { code: "svc", name: "Salvadoran Colón" },
  { code: "syp", name: "Syrian Pound" },
  { code: "szl", name: "Eswatini Lilangeni" },
  { code: "thb", name: "Thai Baht" },
  { code: "tjs", name: "Tajikistani Somoni" },
  { code: "tmt", name: "Turkmenistani Manat" },
  { code: "tnd", name: "Tunisian Dinar" },
  { code: "top", name: "Tongan Paʻanga" },
  { code: "try", name: "Turkish Lira" },
  { code: "ttd", name: "Trinidad and Tobago Dollar" },
  { code: "twd", name: "New Taiwan Dollar" },
  { code: "tzs", name: "Tanzanian Shilling" },
  { code: "uah", name: "Ukrainian Hryvnia" },
  { code: "ugx", name: "Ugandan Shilling" },
  { code: "usd", name: "US Dollar" },
  { code: "uyu", name: "Uruguayan Peso" },
  { code: "uzs", name: "Uzbekistani Som" },
  { code: "ves", name: "Venezuelan Bolívar Soberano" },
  { code: "vnd", name: "Vietnamese Dong" },
  { code: "vuv", name: "Vanuatu Vatu" },
  { code: "wst", name: "Samoan Tala" },
  { code: "xaf", name: "CFA Franc BEAC" },
  { code: "xcd", name: "East Caribbean Dollar" },
  { code: "xof", name: "CFA Franc BCEAO" },
  { code: "xpf", name: "CFP Franc" },
  { code: "yer", name: "Yemeni Rial" },
  { code: "zar", name: "South African Rand" },
  { code: "zmw", name: "Zambian Kwacha" },
  { code: "zwl", name: "Zimbabwean Dollar" },
];

interface CurrencySelectorProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onChange,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCurrency = currencies.find((c) => c.code === value);

  const handleSelect = (currency: Currency) => {
    onChange(currency.code);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`currency-select ${isOpen ? "open" : ""}`}
        ref={selectorRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="selected"
          style={{ color: selectedCurrency ? "#fff" : "#acacaa80" }}
        >
          {selectedCurrency ? (
            <>
              {selectedCurrency.code.toUpperCase()}{" "}
              <span>{selectedCurrency.name}</span>
            </>
          ) : (
            "Select"
          )}
        </span>
        <ul className="select-options">
          {currencies.map((currency) => (
            <li
              key={currency.code}
              className="select-option"
              data-value={currency.code}
              onClick={() => handleSelect(currency)}
            >
              {currency.code.toUpperCase()} <span>{currency.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <input
        className="hidden-input"
        name="currency"
        id="currency-input"
        value={value}
        required={required}
        readOnly
      />
    </>
  );
};

export default CurrencySelector;
