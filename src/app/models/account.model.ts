import * as moment from 'moment';

export class Account {
    id?                : number;
    username           : string;
    email              : string;
    password           : string;
    dni                : number;
    firstName          : string;
    lastName           : string;
    birthDate          : moment.Moment | string;
    userStatusId?      : number;
    role?              : number;
    jobId              : number;
    studiesId          : number;
    isModerator?       : boolean;
    status?            : string;
    created?           : Date;
    lastActivity?      : Date;
    afiliated?         : boolean;
    picture?           : any;
    localidadId        : number;
    adresslocationId   : number;
    adressStreet       : string;
    adressHouseNumber  : string;
    adressFloor?       : string;
    adressApartment?   : string;
    phoneMobile        : number;
    phoneLandline?     : number;
    politicalPartyId   : number[];
    facebook?          : string;
    instagram?         : string;
    twitter?           : string;
}

/*
id                 INT
dni                INT
username           VARCHAR(100)
email              VARCHAR(100)
userStatusId       INT
localidadId        INT
role               INT
jobId              INT
studiesId          INT
isModerator        TINYINT(4)
status             VARCHAR(100)
password           VARCHAR(100)
firstName          VARCHAR(100)
lastName           VARCHAR(100)
birthDate          TIMESTAMP
created            TIMESTAMP
lastActivity       TIMESTAMP
afiliated          TINYINT
picture            BLOB
adressStreet       VARCHAR(100)
adressHouseNumber  VARCHAR(100)
adresslocationId   INT
phoneMobile        INT
phoneLandline      INT
politicalPartyId   INT
facebook           VARCHAR(100)
instagram          VARCHAR(100)
twitter            VARCHAR(100)
*/