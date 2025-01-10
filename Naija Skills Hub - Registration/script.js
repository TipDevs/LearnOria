class DropdownManager {
    constructor(stateSelectId, lgaSelectId, loadingSpinnerId) {
     this.stateSelect = document.getElementById(stateSelectId);
     this.lgaSelect = document.getElementById(lgaSelectId);
     this.loadingSpinner = document.getElementById(loadingSpinnerId);
     this.statesAndLGAs = {};
     // Will be populated dynamically or predefined
    }
   
    /**
     * Initialize the states and LGAs.
     * @param {Object} statesAndLGAs - The data structure for states and their LGAs.
     */
    setStatesAndLGAs(statesAndLGAs) {
     this.statesAndLGAs = statesAndLGAs;
    }
  
   
    /**
     * Populate the state dropdown.
     */
    populateStates() {
     Object.keys(this.statesAndLGAs).forEach((state) => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      this.stateSelect.appendChild(option);
     });
    }
   
    /**
     * Update LGAs based on the selected state.
     * @param {string} selectedState - The state selected by the user.
     */
    updateLGAs(selectedState) {
     const lgas = this.statesAndLGAs[selectedState] || [];
     this.lgaSelect.innerHTML = '<option selected disabled>Select your LGA</option>';
   
     if (lgas.length === 0) {
      const option = document.createElement("option");
      option.textContent = "No LGAs available";
      option.disabled = true;
      this.lgaSelect.appendChild(option);
      return;
     }
   
     lgas.forEach((lga) => {
      const option = document.createElement("option");
      option.value = lga;
      option.textContent = lga;
      this.lgaSelect.appendChild(option);
     });
    }
   
    /**
     * Show or hide the loading spinner.
     * @param {boolean} show - Whether to show the spinner.
     */
    showLoading(show = true) {
     this.loadingSpinner.style.display = show ? "block" : "none";
    }
   
    /**
     * Handle state change event.
     */
    handleStateChange() {
     const selectedState = this.stateSelect.value;
     if (!selectedState) return;
     this.showLoading(true);
     // Simulate async operation using Promise
     setTimeout(() => {
      this.updateLGAs(selectedState);
      this.showLoading(false);
     }, 500);
    }
   
    /**
     * Validate the form inputs.
     * @returns {boolean} - Whether the form inputs are valid.
     */
    validateSelection() {
     const selectedState = this.stateSelect.value;
     const selectedLGA = this.lgaSelect.value;
   
     if (!selectedState || !selectedLGA) {
      alert("Please select both State and LGA.");
      return false;
     }
   
     alert(`You have selected:\nState: ${selectedState}\nLGA: ${selectedLGA}`);
     return true;
    }
   
    /**
     * Initialize event listeners.
     */
    initializeEventListeners() {
     this.stateSelect.addEventListener("change", this.handleStateChange.bind(this));
   
     document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      this.validateSelection();
     });
    }
   
    /**
     * Initialize the application.
     */
    init() {
     this.populateStates();
     this.initializeEventListeners();
    }}
    
   class NigerianDropdownManager extends DropdownManager {
    constructor(stateSelectId, lgaSelectId, loadingSpinnerId) {
     super(stateSelectId, lgaSelectId, loadingSpinnerId);
    }
   
    /**
     * Override the populateStates method for additional customization.
     */
    populateStates() {
     super.populateStates();
     console.log("Nigerian states have been populated.");
    }
   }
   
   // Application Initialization
   document.addEventListener("DOMContentLoaded", () => {
    const statesAndLGAs = {
     Abia: ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"],
     Adamawa: ["Demsa", "Fufore", "Ganye", "Girei", "Gombi", "Guyuk", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
     AkwaIbom: ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
     Anambra: ["Aguata", "Awka North", "Awka South", "Anambra East", "Anambra West", "Anaocha", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
     Bauchi: ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
     bayelsa: [
       "Brass",
       "Ekeremor",
       "Kolokuma/Opokuma",
       "Nembe",
       "Ogbia",
       "Sagbama",
       "Southern Ijaw",
       "Yenagoa",
     ],
     benue: [
       "Ado",
       "Agatu",
       "Apa",
       "Buruku",
       "Gboko",
       "Guma",
       "Gwer East",
       "Gwer West",
       "Katsina-Ala",
       "Konshisha",
       "Kwande",
       "Logo",
       "Makurdi",
       "Obi",
       "Ogbadibo",
       "Ohimini",
       "Oju",
       "Okpokwu",
       "Otukpo",
       "Tarka",
       "Ukum",
       "Ushongo",
       "Vandeikya",
     ],
     borno: [
       "Abadam",
       "Askira/Uba",
       "Bama",
       "Bayo",
       "Biu",
       "Chibok",
       "Damboa",
       "Dikwa",
       "Gubio",
       "Guzamala",
       "Gwoza",
       "Hawul",
       "Jere",
       "Kaga",
       "Kala/Balge",
       "Konduga",
       "Kukawa",
       "Kwaya Kusar",
       "Mafa",
       "Magumeri",
       "Maiduguri",
       "Marte",
       "Mobbar",
       "Monguno",
       "Ngala",
       "Nganzai",
       "Shani",
     ],
     cross_river: [
       "Abi",
       "Akamkpa",
       "Akpabuyo",
       "Bakassi",
       "Bekwarra",
       "Biase",
       "Boki",
       "Calabar Municipal",
       "Calabar South",
       "Etung",
       "Ikom",
       "Obanliku",
       "Obubra",
       "Obudu",
       "Odukpani",
       "Ogoja",
       "Yakuur",
       "Yala",
     ],
     delta: [
       "Aniocha North",
       "Aniocha South",
       "Bomadi",
       "Burutu",
       "Ethiope East",
       "Ethiope West",
       "Ika North East",
       "Ika South",
       "Isoko North",
       "Isoko South",
       "Ndokwa East",
       "Ndokwa West",
       "Okpe",
       "Oshimili North",
       "Oshimili South",
       "Patani",
       "Sapele",
       "Udu",
       "Ughelli North",
       "Ughelli South",
       "Ukwuani",
       "Uvwie",
       "Warri North",
       "Warri South",
       "Warri South West",
     ],
     ebonyi: [
       "Abakaliki",
       "Afikpo North",
       "Afikpo South",
       "Ebonyi",
       "Ezza North",
       "Ezza South",
       "Ikwo",
       "Ishielu",
       "Ivo",
       "Izzi",
       "Ohaozara",
       "Ohaukwu",
       "Onicha",
     ],
     edo: [
       "Akoko-Edo",
       "Egor",
       "Esan Central",
       "Esan North-East",
       "Esan South-East",
       "Esan West",
       "Etsako Central",
       "Etsako East",
       "Etsako West",
       "Igueben",
       "Ikpoba-Okha",
       "Orhionmwon",
       "Oredo",
       "Ovia North-East",
       "Ovia South-West",
       "Owan East",
       "Owan West",
       "Uhunmwonde",
     ],
     ekiti: [
       "Ado Ekiti",
       "Efon",
       "Ekiti East",
       "Ekiti South-West",
       "Ekiti West",
       "Emure",
       "Gbonyin",
       "Ido Osi",
       "Ijero",
       "Ikere",
       "Ikole",
       "Ilejemeje",
       "Irepodun/Ifelodun",
       "Ise/Orun",
       "Moba",
       "Oye",
     ],
     enugu: [
       "Aninri",
       "Awgu",
       "Enugu East",
       "Enugu North",
       "Enugu South",
       "Ezeagu",
       "Igbo Etiti",
       "Igbo Eze North",
       "Igbo Eze South",
       "Isi Uzo",
       "Nkanu East",
       "Nkanu West",
       "Nsukka",
       "Oji River",
       "Udenu",
       "Udi",
       "Uzouwani",
     ],
     gombe: [
       "Akko",
       "Balanga",
       "Billiri",
       "Dukku",
       "Funakaye",
       "Gombe",
       "Kaltungo",
       "Kwami",
       "Nafada",
       "Shongom",
       "Yamaltu/Deba",
     ],
     imo: [
       "Aboh Mbaise",
       "Ahiazu Mbaise",
       "Ehime Mbano",
       "Ezinihitte",
       "Ideato North",
       "Ideato South",
       "Ihitte/Uboma",
       "Ikeduru",
       "Isiala Mbano",
       "Isu",
       "Mbaitoli",
       "Ngor Okpala",
       "Njaba",
       "Nkwerre",
       "Nwangele",
       "Obowo",
       "Oguta",
       "Ohaji/Egbema",
       "Okigwe",
       "Onuimo",
       "Orlu",
       "Orsu",
       "Oru East",
       "Oru West",
     ],
     jigawa: [
       "Auyo",
       "Babura",
       "Biriniwa",
       "Birnin Kudu",
       "Buji",
       "Dutse",
       "Gagarawa",
       "Garki",
       "Gumel",
       "Guri",
       "Gwaram",
       "Gwiwa",
       "Hadejia",
       "Jahun",
       "Kafin Hausa",
       "Kaugama",
       "Kazaure",
       "Kiri Kasama",
       "Kiyawa",
       "Maigatari",
       "Malam Madori",
       "Miga",
       "Ringim",
       "Roni",
       "Sule Tankarkar",
       "Taura",
       "Yankwashi",
     ],
     kaduna: [
       "Birnin Gwari",
       "Chikun",
       "Giwa",
       "Igabi",
       "Ikara",
       "Jaba",
       "Jema'a",
       "Kachia",
       "Kaduna North",
       "Kaduna South",
       "Kagarko",
       "Kajuru",
       "Kaura",
       "Kauru",
       "Kubau",
       "Kudan",
       "Lere",
       "Makarfi",
       "Sabon Gari",
       "Sanga",
       "Soba",
       "Zangon Kataf",
       "Zaria",
     ],
     kano: [
       "Ajingi",
       "Albasu",
       "Bagwai",
       "Bebeji",
       "Bichi",
       "Bunkure",
       "Dala",
       "Dambatta",
       "Dawakin Kudu",
       "Dawakin Tofa",
       "Doguwa",
       "Fagge",
       "Gabasawa",
       "Garko",
       "Garun Mallam",
       "Gaya",
       "Gezawa",
       "Gwale",
       "Gwarzo",
       "Kabo",
       "Kano Municipal",
       "Karaye",
       "Kibiya",
       "Kiru",
       "Kumbotso",
       "Kunchi",
       "Kura",
       "Madobi",
       "Makoda",
       "Minjibir",
       "Nasarawa",
       "Rano",
       "Rimin Gado",
       "Rogo",
       "Shanono",
       "Sumaila",
       "Takai",
       "Tarauni",
       "Tofa",
       "Tsanyawa",
       "Tudun Wada",
       "Ungogo",
       "Warawa",
       "Wudil",
     ],
     katsina: [
       "Bakori",
       "Batagarawa",
       "Batsari",
       "Baure",
       "Bindawa",
       "Charanchi",
       "Dandume",
       "Danja",
       "Dan Musa",
       "Daura",
       "Dutsi",
       "Dutsin Ma",
       "Faskari",
       "Funtua",
       "Ingawa",
       "Jibia",
       "Kafur",
       "Kaita",
       "Kankara",
       "Kankia",
       "Katsina",
       "Kurfi",
       "Kusada",
       "Mai'Adua",
       "Malumfashi",
       "Mani",
       "Mashi",
       "Matazu",
       "Musawa",
       "Rimi",
       "Sabuwa",
       "Safana",
       "Sandamu",
       "Zango",
     ],
     kebbi: [
           "Aleiro", "Arewa Dandi", "Argungu", "Augie", 
           "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", 
           "Fakai", "Gwandu", "Jega", "Kalgo", 
           "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", 
           "Shanga", "Suru", "Wasagu/Danko", "Yauri", 
           "Zuru"
       ],
       kogi: [
           "Adavi", "Ajaokuta", "Ankpa", "Bassa", 
           "Dekina", "Ibaji", "Idah", "Igalamela-Odolu", 
           "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", 
           "Mopa-Muro", "Ofu", "Ogori/Magongo", "Okehi", 
           "Okene", "Olamaboro", "Omala", "Yagba East", 
           "Yagba West"
       ],
       kwara: [
           "Asa", "Baruten", "Edu", "Ekiti", 
           "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", 
           "Irepodun", "Isin", "Kaiama", "Moro", 
           "Offa", "Oke Ero", "Oyun", "Pategi"
       ],
       lagos: [
           "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", 
           "Apapa", "Badagry", "Epe", "Eti Osa", 
           "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", 
           "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", 
           "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
       ],
       nasarawa: [
           "Akwanga", "Awe", "Doma", "Karu", 
           "Keana", "Keffi", "Kokona", "Lafia", 
           "Nasarawa", "Nasarawa Egon", "Obi", "Toto", 
           "Wamba"
       ],
       niger: [
           "Agaie", "Agwara", "Bida", "Borgu", 
           "Bosso", "Chanchaga", "Edati", "Gbako", 
           "Gurara", "Katcha", "Kontagora", "Lapai", 
           "Lavun", "Magama", "Mariga", "Mashegu", 
           "Mokwa", "Moya", "Paikoro", "Rafi", 
           "Rijau", "Shiroro", "Suleja", "Tafa", 
           "Wushishi"
       ],
       ogun: [
           "Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", 
           "Egbado South", "Ewekoro", "Ifo", "Ijebu East", 
           "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", 
           "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", 
           "Odogbolu", "Ogun Waterside", "Remo North", "Sagamu"
       ],
       ondo: [
           "Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", 
           "Akure North", "Akure South", "Ese Odo", "Idanre", 
           "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", 
           "Odigbo", "Okitipupa", "Ondo East", "Ondo West", 
           "Ose", "Owo"
       ],
       osun: [
           "Aiyedaade", "Aiyedire", "Atakumosa East", "Atakumosa West", 
           "Boluwaduro", "Boripe", "Ede North", "Ede South", 
           "Egbedore", "Ejigbo", "Ife Central", "Ife East", 
           "Ife North", "Ife South", "Ifedayo", "Ifelodun", 
           "Ila", "Ilesa East", "Ilesa West", "Irepodun", 
           "Irewole", "Isokan", "Iwo", "Obokun", 
           "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", 
           "Orolu", "Osogbo"
       ],
       oyo: [
           "Afijio", "Akinyele", "Atiba", "Atisbo", 
           "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", 
           "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", 
           "Ibarapa North", "Ido", "Irepo", "Iseyin", 
           "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", 
           "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", 
           "Oluyole", "Ona Ara", "Orelope", "Ori Ire", 
           "Oyo East", "Oyo West", "Saki East", "Saki West", 
           "Surulere"
       ],
       plateau: [
           "Bokkos", "Barkin Ladi", "Bassa", "Jos East", 
           "Jos North", "Jos South", "Kanam", "Kanke", 
           "Langtang North", "Langtang South", "Mangu", "Mikang", 
           "Pankshin", "Qua'an Pan", "Riyom", "Shendam", 
           "Wase"
       ],
       rivers: [
           "Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", 
           "Andoni", "Asari-Toru", "Bonny", "Degema", 
           "Eleme", "Emuoha", "Etche", "Gokana", 
           "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", 
           "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", 
           "Oyigbo", "Port Harcourt", "Tai"
       ],
       sokoto: [
           "Binji", "Bodinga", "Dange Shuni", "Gada", 
           "Goronyo", "Gudu", "Gwadabawa", "Illela", 
           "Isa", "Kebbe", "Kware", "Rabah", 
           "Sabon Birni", "Shagari", "Silame", "Sokoto North", 
           "Sokoto South", "Tambuwal", "Tangaza", "Tureta", 
           "Wamako", "Wurno", "Yabo"
       ],
       taraba: [
           "Ardo Kola", "Bali", "Donga", "Gashaka", 
           "Gassol", "Ibi", "Jalingo", "Karim Lamido", 
           "Kurmi", "Lau", "Sardauna", "Takum", 
           "Ussa", "Wukari", "Yorro", "Zing"
       ],
       yobe: [
           "Bade", "Bursari", "Damaturu", "Fika", 
           "Fune", "Geidam", "Gujba", "Gulani", 
           "Jakusko", "Karasuwa", "Machina", "Nangere", 
           "Nguru", "Potiskum", "Tarmuwa", "Yunusari", 
           "Yusufari"
       ],
       zamfara: [
           "Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", 
           "Bungudu", "Gummi", "Gusau", "Kaura Namoda", 
           "Maradun", "Maru", "Shinkafi", "Talata Mafara", 
           "Zurmi"
       ],
       fct: [
           "Abaji", "Bwari", "Gwagwalada", "Kuje", 
           "Kwali", "Municipal Area Council"
       ]
      // Add more states here...
     // Add more states here...
    };
   
    const dropdownManager = new NigerianDropdownManager("state", "lga", "loading");
    dropdownManager.setStatesAndLGAs(statesAndLGAs);
    dropdownManager.init();
   });