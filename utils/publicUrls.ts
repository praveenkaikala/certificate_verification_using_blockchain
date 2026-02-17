export const backend_url:string="http://localhost:5000/api/v1/"
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
  getInstitutes: StaticBody;
  getInstituteById: DynamicBody;
  verifyInstitute: DynamicBody;
  deleteInstitute: DynamicBody;
}
interface InstituteStudents {
  getAll: StaticBody;
  getById: DynamicBody;
  verify: DynamicBody;
  remove: DynamicBody;
}

interface InstituteCertificates {
  issue: StaticBody;
  putIssue:StaticBody;
  getIssued: StaticBody;
}
interface Public{
  details:any;
}
interface Institute {
  students: InstituteStudents;
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
    getInstitutes: {
      method: "get",
      url: "admin/institutes",
    },
    getInstituteById: {
      method: "get",
      url: (instituteId: string) =>
        `admin/institutes/${instituteId}`,
    },
    verifyInstitute: {
      method: "put",
      url: (instituteId: string) =>
        `admin/institutes/${instituteId}/verify`,
    },
    deleteInstitute: {
      method: "delete",
      url: (instituteId: string) =>
        `admin/institutes/${instituteId}`,
    },
  },

  institute: {
    students: {
      getAll: {
        method: "get",
        url: "institutes/students",
      },
      getById: {
        method: "get",
        url: (studentId: string) =>
          `institutes/students/${studentId}`,
      },
      verify: {
        method: "put",
        url: (studentId: string) =>
          `institutes/students/${studentId}/verify`,
      },
      remove: {
        method: "delete",
        url: (studentId: string) =>
          `institutes/students/${studentId}`,
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
      getIssued: {
        method: "get",
        url: "institutes/certificates",
      },
    },
  },

  student: {
    stats: {
      method: "get",
      url: "student/stats",
    },
    certificates: {
      getAll: {
        method: "get",
        url: "student/certificates",
      },
      getById: {
        method: "get",
        url: (certificateId: string) =>
          `student/certificates/${certificateId}`,
      },
    },
  },
};