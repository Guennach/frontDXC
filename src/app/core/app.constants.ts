enum langue {
    FRANCAIS = 'fr',
    ARABE = 'ar'
}

enum inactivityTimer {
    SESSION_TIMEOUT_SEC = 1800, // 1800 s = 30 min
    COUNTDOWN_SEC = 60,
}

enum dateFormat  {
    DATE_STANDARD = 'DD/MM/YYYY à HH:mm',
    DATE_STANDARD_AR = 'DD/M/YYYY مع HH:mm',
    DATE_D_M_Y = 'DD/MM/YYYY',
    DATE_H_M = 'HH:mm'
}


enum status  {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

enum myDatePickerFormat {
    DATE_STANDARD = 'dd-mm-yyyy'
}

enum httpMethod {
    GET = 'GET',
    POST = 'POST'
}
enum order {
    ASC = 'ASC',
    DESC = 'DESC'
}

enum environnementMode {
    CONNECTE = 'C',
    DECONNECTE = 'D'
}

export class GlobalConstant {

    static readonly ROOT_URL: String = 'http://localhost:4043/app/rest'

    static readonly LANGUES = langue;
    static readonly DATE_FORMAT = dateFormat;
    static readonly STATUS = status;
    static readonly MY_DATE_PICKER_FORMAT = myDatePickerFormat;
    static readonly HTTP_METHOD = httpMethod;
    static readonly ORDER = order;
    static readonly ENVIRONNEMENT_MODE = environnementMode;
    static readonly INACTIVITY_TIMER = inactivityTimer;
    static readonly TIME_ZONE = 60;
    static readonly MAX_RESULT_WINDOW = 10000;
    static readonly dtOptions = {
      pageLength: 10,
      info:false,
      ordering:true,
      language:{url:"/assets/i18n/fr.json"}
    }

}
