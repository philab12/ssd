"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UssdService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const xml2json_1 = require("@hendt/xml2json");
const moment = require("moment");
const xml2js_1 = require("xml2js");
let UssdService = class UssdService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async create(xmlData) {
        const jsonData = (0, xml2json_1.default)(xmlData);
        const { requestId, sessionId, msisdn, starCode, keyWord, featureId, dataSet, userData, timeStamp } = jsonData.USSDDynMenuRequest;
        const { sequence, intro, merchantCode, amount_trans, network_selected } = dataSet.param;
        this.requestId = requestId;
        this.sessionId = sessionId;
        this.msisdn = msisdn;
        this.starCode = starCode;
        this.session_timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        const phoneNumber1 = msisdn.replace(/[+-]/g, '').replace(/\s+/g, '');
        let narration;
        let network;
        if (userData === "*421#") {
            const sequencee = "1";
            this.id = 1;
            this.rspFlag = 1;
            this.noti_message = `Welcome to PeoplesPay
      1. Check Balance
      2. Make Payment
      3. Accept Payment
      4. Make a Donation`;
            this.tagSet = `
      <tagSet>
      <sequence>${sequencee}</sequence>
    </tagSet>
      `;
            return this.xmlData();
        }
        else if ((userData == "1" || userData == "2" || userData == "3" || userData == "4" || parseInt(userData) > 4) && sequence == "1") {
            const introo = userData;
            const sequencee = "2";
            this.id = 2;
            this.rspFlag = 1;
            this.tagSet = `
      <tagSet>
      <sequence>${sequencee}</sequence>
      <intro>${introo}</intro>
    </tagSet>
      `;
            if (userData === '1' || userData === '3') {
                this.noti_message = "Enter Your Merchant Code";
            }
            else if (userData === '2') {
                this.noti_message = "Enter The Merchant Code";
            }
            else if (userData === "4") {
                this.noti_message = "Enter Recipient Code";
            }
            else {
                this.error_message = "Invalid Choice";
                return this.xmlError();
            }
            return this.xmlData();
        }
        else if (userData && sequence == "2") {
            const merchantCodee = userData;
            const sequencee = "3";
            this.id = 3;
            this.rspFlag = 1;
            this.tagSet = `<tagSet>
      <sequence>${sequencee}</sequence>
      <intro>${intro}</intro>
      <merchantCode>${merchantCodee}</merchantCode>
    </tagSet>
      `;
            const data = {
                "code": userData
            };
            try {
                const httpResp = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://peoplespay.com.gh/api/checkout/verify`, data));
                if (intro == "1" && httpResp.data.success) {
                    const balance = `GHC${Number(parseFloat(httpResp.data.data.balance)).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`;
                    this.rspFlag = 2;
                    this.tagSet = "";
                    this.noti_message = `Merchant Balance Is ${balance}`;
                    return this.xmlData();
                }
                else if ((intro == "2" || intro == "3" || intro == "4") && httpResp.data.success) {
                    if (intro == "3") {
                        this.noti_message = `Select Network To Accept Payment ?
          1. MTN
          2. VODAFONE
          3. AIRTELTIGO`;
                        return this.xmlData();
                    }
                    else {
                        this.noti_message = `Please Select Network You Are Using ?
          1. MTN
          2. VODAFONE
          3. AIRTELTIGO`;
                        return this.xmlData();
                    }
                }
                else if (!httpResp.data.success) {
                    if (intro == "1" || intro == "2" || intro == "3") {
                        this.error_message = "Invalid Merchant Code";
                        return this.xmlError();
                    }
                    else {
                        this.error_message = "Invalid Recipient Code";
                        return this.xmlError();
                    }
                }
            }
            catch (error) {
                this.error_message = "Server Issues";
                return this.xmlError();
            }
        }
        else if (sequence == "3") {
            const network_selectede = userData;
            const sequencee = "4";
            this.id = 4;
            this.rspFlag = 1;
            this.tagSet = `<tagSet>
    <sequence>${sequencee}</sequence>
    <intro>${intro}</intro>
    <merchantCode>${merchantCode}</merchantCode>
    <network_selected>${network_selectede}</network_selected>
  </tagSet>
    `;
            if (intro == "1" || intro == "2" || intro == "3" || intro == "4") {
                if (intro === "2") {
                    this.noti_message = "Enter Amount To Pay";
                    return this.xmlData();
                }
                else if (intro === "3") {
                    this.noti_message = "Enter Amount To Pay";
                    return this.xmlData();
                }
                else if (intro === "4") {
                    this.noti_message = "Enter Donation Amount";
                    return this.xmlData();
                }
            }
            else {
                this.error_message = "Invalid Selection";
                return this.xmlError();
            }
        }
        else if (sequence == "4") {
            const sequencee = "5";
            const amount_transe = parseFloat(userData);
            const number = parseFloat(userData);
            this.id = 5;
            this.rspFlag = 1;
            this.tagSet = `<tagSet>
     <sequence>${sequencee}</sequence>
     <intro>${intro}</intro>
     <merchantCode>${merchantCode}</merchantCode>
     <network_selected>${network_selected}</network_selected>
     <amount_trans>${amount_transe}</amount_trans>
   </tagSet>
     `;
            if (intro == "2") {
                this.noti_message = `BEING PAYMENT MADE TO Merchant ${merchantCode}`;
            }
            else if (intro == "3") {
                this.noti_message = `PAYMENT ACCEPTED BY Merchant ${merchantCode}`;
            }
            else if (intro == "4") {
                this.noti_message = `DONATION TO Merchant ${merchantCode}`;
            }
            if (this.isInt(number) || this.isFloat(number)) {
                if (intro == "2" || intro == "4") {
                    if (network_selected == "1") {
                        network = "mtn";
                    }
                    else if (network_selected == "2") {
                        network = "vodafone";
                    }
                    else if (network_selected == "3") {
                        network = "airteltigo";
                    }
                    const data = {
                        "code": merchantCode,
                        "amount": userData,
                        "payee": phoneNumber1,
                        "issuer": network,
                        narration
                    };
                    try {
                        const httpResp = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${process.env.peopleUrl}/payment`, data));
                        if ((intro == "2" || intro == "4") && httpResp.data.success) {
                            if (httpResp.data.success) {
                                this.rspFlag = 2;
                                this.tagSet = "";
                                this.noti_message = "Transaction Received For Processing, Pending Authorization From You...";
                                return this.xmlData();
                            }
                        }
                    }
                    catch (error) {
                        this.error_message = "Server Issues";
                        return this.xmlError();
                    }
                }
                else if (intro == "3") {
                    this.noti_message = "Enter Wallet Payee Number";
                    return this.xmlData();
                }
            }
            else {
                this.error_message = "Invalid Amount Entered";
                return this.xmlError();
            }
        }
        else if (sequence == "5") {
            const sequencee = "6";
            this.id = 6;
            this.rspFlag = 1;
            this.tagSet = `<tagSet>
    <sequence>${sequencee}</sequence>
    <intro>${intro}</intro>
    <merchantCode>${merchantCode}</merchantCode>
    <network_selected>${network_selected}</network_selected>
    <amount_trans>${amount_trans}</amount_trans>
  </tagSet>
    `;
            const narration = `PAYMENT ACCEPTED BY Merchant ${merchantCode}`;
            if (intro == "3") {
                this.noti_message = `A Payment Prompt Has Been Sent Successfully`;
                this.rspFlag = 2;
                this.tagSet = "";
                if (network_selected == "1") {
                    network = "mtn";
                }
                else if (network_selected == "2") {
                    network = "vodafone";
                }
                else if (network_selected == "3") {
                    network = "airteltigo";
                }
                const data = {
                    "code": merchantCode,
                    "amount": amount_trans,
                    "payee": userData,
                    "issuer": network,
                    narration
                };
                try {
                    const httpResp = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${process.env.peopleUrl}/payment`, data));
                    if (httpResp.data.success) {
                        return this.xmlData();
                    }
                    else {
                        this.error_message = "Transaction Did Not Go Through";
                        return this.xmlError();
                    }
                }
                catch (error) {
                    this.error_message = "Server Issues";
                    return this.xmlError();
                }
            }
            else {
                this.error_message = "Invalid Payee Wallet Number";
                return this.xmlError();
            }
        }
    }
    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }
    isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
    xmlData() {
        return `<USSDDynMenuResponse>
   <requestId>${this.requestId}</requestId>
   <sessionId>${this.sessionId}</sessionId>
   <msisdn>${this.msisdn}</msisdn>
   <starCode>${this.starCode}</starCode>                    
   <dataSet>
       <param>
           <id>${this.id}</id>
           <value>${this.noti_message}</value>
           <rspFlag>${this.rspFlag}</rspFlag>
           <default>1</default>
           <appendIndex>0</appendIndex>
           ${this.tagSet}
       </param>
   </dataset>
   <ErrCode>1</ErrCode>
   <timeStamp>${this.session_timestamp}</timeStamp>
   <langId>1</langId>
   <encodingScheme>0</encodingScheme>
</USSDDynMenuResponse>`;
    }
    xmlError() {
        return `<USSDError>
         <requestid>${this.requestId}</requestId>
         <errorCode>112</errorCode>
         <responseFlag>Y</responseFlag>
         <userData>${this.error_message}</userData>
         </USSDError>`;
    }
    parseXml(xml) {
        return new Promise((resolve, reject) => {
            (0, xml2js_1.parseString)(xml, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    removeNode(xmlObject, nodeName) {
        delete xmlObject[nodeName];
    }
    buildXml(xmlObject) {
        return new Promise((resolve, reject) => {
            const builder = new xml2js_1.Builder();
            const xml = builder.buildObject(xmlObject);
            resolve(xml);
        });
    }
    findAll() {
        return `This action returns all ussd`;
    }
    findOne(id) {
        return `This action returns a #${id} ussd`;
    }
    update(id, updateUssdDto) {
        return `This action updates a #${id} ussd`;
    }
    remove(id) {
        return `This action removes a #${id} ussd`;
    }
};
exports.UssdService = UssdService;
exports.UssdService = UssdService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UssdService);
//# sourceMappingURL=ussd.service.js.map