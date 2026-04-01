export const backend_url:string="https://doria-multiovular-cayla.ngrok-free.dev/api/v1/"
export const pinata_gateway:string ="http://scarlet-impossible-squirrel-929.mypinata.cloud/ipfs/"
export const CONTRACT="0x5f9af9856E4b7Dd1EeCEF08CD5520eaB58b938eB"
type HttpMethod = "get" | "post" | "put" | "delete";
// "https://certificate-verification-backend.vercel.app/api/v1/"
interface StaticBody {
  method: HttpMethod;
  url: string;
}

interface DynamicBody {
  method: HttpMethod;
  url: (id: string) => string;
}

type Body = StaticBody | DynamicBody;
interface Auth {
  adminLogin: StaticBody;
  instituteLogin: StaticBody;
  studentLogin: StaticBody;
  studentRegister: StaticBody;
  instituteRegister: StaticBody;
  verifyOtp: StaticBody;
}
interface Admin {
  getStats:StaticBody;
  getInstitutes: any;
  getInstituteById: any;
  verifyInstitute: any;
  deleteInstitute: DynamicBody;
}
interface InstituteStudents {
  getAll: any;
  getById: DynamicBody;
  verify: any;
  getPending:any
  remove: any;
}

interface InstituteCertificates {
  issue: StaticBody;
  putIssue:StaticBody;
  getIssued: any;
  deleteCertificate:any
}
interface Public{
  details:any;
}
interface Institute {
  students: InstituteStudents;
  getStats:any
  certificates: InstituteCertificates;
}


interface StudentCertificates {
  getAll: StaticBody;
  getById: DynamicBody;
}

interface Student {
  stats: StaticBody;
  certificates: StudentCertificates;
}
export interface EndPoints {
  auth: Auth;
  admin: Admin;
  institute: Institute;
  student: Student;
  public:Public;
}
export const endPoints: EndPoints = {
  public:{
    details:(id:string)=>{
      return {
      method: "get",
      url: `public/details/${id}`
      }
    }
  },
  auth: {
    adminLogin: {
      method: "post",
      url: "auth/admin/login",
    },
    instituteLogin: {
      method: "post",
      url: "auth/institute/login",
    },
    studentLogin: {
      method: "post",
      url: "auth/student/login",
    },
    studentRegister: {
      method: "post",
      url: "auth/student/register",
    },
    instituteRegister: {
      method: "post",
      url: "auth/institute/register",
    },
    verifyOtp: {
      method: "post",
      url: "auth/verify/otp",
    },
  },

  admin: {
    getStats:{
      method:"get",
      url:"admin/stats"
    },
    getInstitutes:(page:number,limit:number)=> {
      return{

        method: "get",
        url: `admin/institutes?page=${page}&limit=${limit}`,
      }
    },
    getInstituteById:(instituteId:string)=> {
      return {

        method: "get",
        url: `admin/institutes/${instituteId}`,
      }
    },
    verifyInstitute: (instituteId: string) => {
      return{

        method: "put",
        url:`admin/institutes/${instituteId}/verify`,
      }
    },
    deleteInstitute: {
      method: "delete",
      url: (instituteId: string) =>
        `admin/institutes/${instituteId}`,
    },
  },

  institute: {
    getStats:{
      method:"get",
      url:"institutes/stats"
    },
    students: {
      getAll: (page:string,limit:string)=>{
        return{
          
        method: "get",
        url: `institutes/students?limit=${limit}&page=${page}`
        }
      },
      getById: {
        method: "get",
        url: (studentId: string) =>
          `institutes/students/${studentId}`,
      },
      verify:(id:string) =>{
        return{

          method: "put",
          url: 
            `institutes/students/${id}/verify`,
        }
      },
       getPending:(page:string,limit:string)=>{
        
return{

  method: "get",
  url: 
    `institutes/students/pending?limit=${limit}&page=${page}`,
}
      
      },
      remove: (id:string)=>{
        return{

          method: "delete",
          url:
            `institutes/students/${id}`,
        }
      },
    },
    certificates: {
      issue: {
        method: "post",
        url: "institutes/certificates",
      },
       putIssue: {
        method: "put",
        url: "institutes/certificates",
      },
      getIssued:(page:number,limit:number)=> {
        return{

          method: "get",
          url: `institutes/certificates?page=${page}&limit=${limit}`
        }
      },
      deleteCertificate:(id:string)=>{
        return {
          method:"delete",
          url:`institutes/certificates/${id}`
        }
      }
    },
  },

  student: {
    stats: {
      method: "get",
      url: "students/stats",
    },
    certificates: {
      getAll: {
        method: "get",
        url: "students/certificates",
      },
      getById: {
        method: "get",
        url: (certificateId: string) =>
          `students/certificates/${certificateId}`,
      },
    },
  },
};
