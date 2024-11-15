export interface IDataSource {
    id: number;
    orgId: number;
    name: string;
    type: string;
    typeLogoUrl: string;
    access: string;
    url: string;
    password: string;
    user: string;
    database: string;
    basicAuth: boolean;
    basicAuthUser: string;
    basicAuthPassword: string;
    withCredentials: boolean;
    isDefault: boolean;
    jsonData: any;
    secureJsonFields: any;
    version: number;
    readOnly: boolean;
    uid: string;
}