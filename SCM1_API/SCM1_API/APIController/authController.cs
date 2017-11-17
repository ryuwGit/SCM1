﻿using Newtonsoft.Json.Linq;
using SCM1_API.Model.constants;
using SCM1_API.Model.ScreenModel.Auth;
using SCM1_API.PresentationService;
using SCM1_API.Util;
using System;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace SCM1_API.APIController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")] // <-- CORSを有効化（クロスドメイン対策）
    public class authController : ApiController
    {
        #region const
        private Auth_PresentationService presentationService;
        public authController()
        {
            presentationService = new Auth_PresentationService();
        }
        #endregion

        #region api/auth(type:POST)
        [LoggingFilter("api/auth")] // <-- AOP（処理開始、終了時のロギング処理）
        public JsonResult<object> Post(JToken reqJson)　 // <-- ActionResultのJsonResultを戻り値とする
        {
            try
            {
                Request req = JsonUtil.Deserialize<Request>(reqJson.ToString()); // <-- JSONをモデルに変換
                Response res = presentationService.Auth(req);
                return Json((object)res);
            }
            catch (Exception ex)
            {
                Logger.WriteException("想定外のエラー", ex);
                return Json((object)new Response() {Status = STATUS.ER, Authenticated = false, Token = "" });
            }
        }
        #endregion
    }
}