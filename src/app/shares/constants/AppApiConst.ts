export const AppAPIConst = {
  SYSTEM:{
    CheckUploadFile:'core/system/checkuploadfile',
    CheckPermission:'HrmMobileApp/CnB/QuestionAndAnswer/CheckPermission'
  },
  LOGIN: {
    Login:'core/authentication/login'
  },
  CHANGEPASSWORD:{
    ChangePassword:"core/authentication/changepassword"
  },
  SIDEBAR:{
    SideBar:'HrmMobileApp/CnB/QuestionAndAnswer/GetMenu',
    Notification:'HrmMobileApp/CnB/QuestionAndAnswer/GetNotification',
  },
  HOME:{
    GetNewsFeeds:"HrmMobileApp/CnB/QuestionAndAnswer/GetNewsFeeds",
    PostRating:'HrmMobileApp/CnB/QuestionAndAnswer/PostRating',
    PostComment:'HrmMobileApp/CnB/QuestionAndAnswer/PostComment',
    GetComments:'HrmMobileApp/CnB/QuestionAndAnswer/GetComments',
    PostNewsFeeds:'HrmMobileApp/CnB/QuestionAndAnswer/PostNewsFeeds',
    EditNewsFeeds:'HrmMobileApp/CnB/QuestionAndAnswer/EditNewsFeeds',
    GetVotes:'HrmMobileApp/CnB/QuestionAndAnswer/GetVotes',
    VoteRespond:'HrmMobileApp/CnB/QuestionAndAnswer/VoteRespond',
    GetVotesRespondWithVotesID:'HrmMobileApp/CnB/QuestionAndAnswer/GetVotesRespondWithVotesID',
    DelNewsFeeds:'HrmMobileApp/CnB/QuestionAndAnswer/DelNewsFeeds',
    DelComments:'HrmMobileApp/CnB/QuestionAndAnswer/DelComments',
  },
  News:{
    tintucGetData:'HrmMobileApp/CnB/QuestionAndAnswer/tintucGetData',
    tintucDetail:'HrmMobileApp/CnB/QuestionAndAnswer/tintucGetDataWithID',
    tintucGetTop5:'HrmMobileApp/CnB/QuestionAndAnswer/tintucGetTop5',
    tintucPost:'HrmMobileApp/CnB/QuestionAndAnswer/tintucPost',
    tintucDel:'HrmMobileApp/CnB/QuestionAndAnswer/tintucDel',
    tintucView:'HrmMobileApp/CnB/QuestionAndAnswer/tintucView'
  },
  Payment:{
    thanhtoanGetData:'HrmMobileApp/CnB/QuestionAndAnswer/thanhtoanGetData',
    thanhtoanPost:'HrmMobileApp/CnB/QuestionAndAnswer/thanhtoanPost',
    thanhtoanDel:'HrmMobileApp/CnB/QuestionAndAnswer/thanhtoanDel',
    thanhtoanDuyet:'HrmMobileApp/CnB/QuestionAndAnswer/thanhtoanDuyet',
    loadAttachmentThanhToan:'HrmMobileApp/CnB/QuestionAndAnswer/loadAttachmentThanhToan',
    thanhtoan_PostAttachment:'HrmMobileApp/CnB/QuestionAndAnswer/thanhtoan_PostAttachment',
  },
  Vote:{
    GetVotes:'HrmMobileApp/CnB/QuestionAndAnswer/GetVotes',
    VoteRespond:'HrmMobileApp/CnB/QuestionAndAnswer/VoteRespond',
    GetVotesRespondWithVotesID:'HrmMobileApp/CnB/QuestionAndAnswer/GetVotesRespondWithVotesID',
    AddVote:'HrmMobileApp/CnB/QuestionAndAnswer/AddVote',
    DeleteVote:'HrmMobileApp/CnB/QuestionAndAnswer/DeleteVote',
    CloseVote:'HrmMobileApp/CnB/QuestionAndAnswer/CloseVote',
  },
  Feedback:{
    Feedback_get:'HrmMobileApp/CnB/Feedback/Feedback_get',
    Feedback_put:'HrmMobileApp/CnB/Feedback/Feedback_put',
    Feedback_post:'HrmMobileApp/CnB/Feedback/Feedback_post',
    Feedback_delete:'HrmMobileApp/CnB/Feedback/Feedback_delete',
    Feedback_getdetail:'HrmMobileApp/CnB/Feedback/Feedback_getdetail'
  },
  CoCauToChuc:{
    Departments_get:"HrmMobileApp/CnB/Danhmuc/Departments_get",
    Employees_get:"HrmMobileApp/CnB/Danhmuc/Employees_get",
    Departments_spPostData:'HrmMobileApp/CnB/Danhmuc/Departments_spPostData',
    Departments_spdeleteData:"HrmMobileApp/CnB/Danhmuc/Departments_spdeleteData"
  },
  QuanLyNhanVien:{
    Employees_get:'HrmMobileApp/CnB/Danhmuc/Employees_get',
    Employees_napxu:'HrmMobileApp/CnB/Danhmuc/Employees_napxu',
    Danhmuc_get:'HrmMobileApp/CnB/Danhmuc/Danhmuc_get',
    employee_post:'HrmMobileApp/CnB/Danhmuc/employee_post',
    employees_spGetDefault:"HrmMobileApp/CnB/Danhmuc/employees_spGetDefault",
    employees_spPostData:"HrmMobileApp/CnB/Danhmuc/employees_spPostData",
    employees_spDeleteData:"HrmMobileApp/CnB/Danhmuc/employees_spDeleteData",
    employees_spLichSuThanhToan:"HrmMobileApp/CnB/Danhmuc/employees_spLichSuThanhToan"
  },
  Scan:{
    Line_GetInfo:"HrmMobileApp/CnB/Danhmuc/Line_GetInfo",
    Line_GetInfo2:"HrmMobileApp/CnB/Danhmuc/Line_GetInfo2",
  }
,
  TheKhach:{
    TheKhach_get: 'HrmMobileApp/CnB/Danhmuc/TheKhach_get',
    TheKhach_napxu: 'HrmMobileApp/CnB/Danhmuc/TheKhach_napxu'
  },
  Report:{
    reportsudungthe_get: 'HrmMobileApp/CnB/Danhmuc/reportsudungthe_get',
    ReportTongHop:'HrmMobileApp/CnB/Danhmuc/ReportTongHop',
    reportsudungthe_getCombo: 'HrmMobileApp/CnB/Danhmuc/reportsudungthe_getCombo'
  },
  Cateogry:{
    NhomPhu_spPostData:"HrmMobileApp/CnB/Danhmuc/NhomPhu_spPostData",
    NhomPhu_spdeleteData:"HrmMobileApp/CnB/Danhmuc/NhomPhu_spdeleteData",
    Ca_spPostData:"HrmMobileApp/CnB/Danhmuc/Ca_spPostData",
    Ca_spdeleteData:"HrmMobileApp/CnB/Danhmuc/Ca_spdeleteData",
    Line_spPostData:"HrmMobileApp/CnB/Danhmuc/Line_spPostData",
    Line_spdeleteData:"HrmMobileApp/CnB/Danhmuc/Line_spdeleteData",
    Line_spGetDefault:"HrmMobileApp/CnB/Danhmuc/Line_spGetDefault"
  },
  CapPhatDinhMucNV:{
    capdinhmuc_spCapDinhMuc:"HrmMobileApp/CnB/Danhmuc/capdinhmuc_spCapDinhMuc",
    capdinhmuc_spGetData:"HrmMobileApp/CnB/Danhmuc/capdinhmuc_spGetData",
    capdinhmuc_spgetDefault:"HrmMobileApp/CnB/Danhmuc/capdinhmuc_spgetDefault"
  }
}
