using API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.IO;
using System.Data;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Configuration;
using System.Data.SqlClient;
using System.Runtime.Serialization;
using System.Net.Mail;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using System.Web.Mvc;
using HttpPostAttribute = System.Web.Mvc.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpDeleteAttribute = System.Web.Http.HttpDeleteAttribute;

namespace API.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class CoursesController : ApiController
    {
        private UCTEntities db = new UCTEntities();

        [HttpGet]
        [Route("api/Courses/getCourses")]
        public List<Cours> getCourses()

        {
            db.Configuration.ProxyCreationEnabled = false;
            List<object> list = new List<object>();
            try
            {
                List<Cours> Courses = db.Courses.ToList();
                return Courses;
            }
            catch (Exception)
            {
                return null;
            }
        }




        ///////////////
        ///


        [HttpPost]
        [Route("api/Courses/CreateCourse")]
        public IHttpActionResult Create([Bind(Include = "CourseId,CourseDesc,SubjectId")] Cours course)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    db.Courses.Add(course);
                    db.SaveChanges();
                    return Ok(course);
                }

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(course);


        }

        [HttpPost]
        [Route("api/Courses/EditCourse/{id}")]
        public IHttpActionResult Edit([Bind(Include = "CourseId,CourseDesc,SubjectId")] Cours cos, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Cours cours = new Cours();
                cours = db.Courses.Where(c => c.CourseId == id).FirstOrDefault();
                if (cours != null)
                {
                    cours.CourseDesc = cos.CourseDesc;
                    cours.SubjectId = cos.SubjectId;


                }
                int i = db.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(cos);

        }

        [HttpDelete]
        [Route("api/Courses/DeleteCourse/{id}")]

        public IHttpActionResult DeleteConfirmed(int id)
        {
            Cours cos = db.Courses.Where(c => c.CourseId == id).FirstOrDefault();
            db.Courses.Remove(cos);
            db.SaveChanges();
            return Ok();
        }
    }
}
