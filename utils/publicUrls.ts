export const backend_url:string="https://certificate-verification-backend.vercel.app/api/v1/"
type HttpMethod = "get" | "post" | "put" | "delete";

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
  getIssued: StaticBody;
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
}
export const endPoints: EndPoints = {
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
        url: "institute/students",
      },
      getById: {
        method: "get",
        url: (studentId: string) =>
          `institute/students/${studentId}`,
      },
      verify: {
        method: "put",
        url: (studentId: string) =>
          `institute/students/${studentId}/verify`,
      },
      remove: {
        method: "delete",
        url: (studentId: string) =>
          `institute/students/${studentId}`,
      },
    },
    certificates: {
      issue: {
        method: "post",
        url: "institute/certificates",
      },
      getIssued: {
        method: "get",
        url: "institute/certificates",
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