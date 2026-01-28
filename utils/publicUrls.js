export const backend_url="https://certificate-verification-backend.vercel.app/api/v1/"

export const endPoints = {
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
      url: (instituteId) =>
        `admin/institutes/${instituteId}`,
    },
    verifyInstitute: {
      method: "put",
      url: (instituteId) =>
        `admin/institutes/${instituteId}/verify`,
    },
    deleteInstitute: {
      method: "delete",
      url: (instituteId) =>
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
        url: (studentId) =>
          `institute/students/${studentId}`,
      },
      verify: {
        method: "put",
        url: (studentId) =>
          `institute/students/${studentId}/verify`,
      },
      remove: {
        method: "delete",
        url: (studentId) =>
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
        url: (certificateId) =>
          `student/certificates/${certificateId}`,
      },
    },
  },
};
