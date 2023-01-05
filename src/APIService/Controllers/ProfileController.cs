using Business.Services;
using Domain.Entities;
using Domain.Util;
using Microsoft.AspNetCore.Mvc;

namespace APIService.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private ProfileBll profileBll = new ProfileBll();
        /// <summary>
        /// get all profiles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(profileBll.GetAll());
        }
        /// <summary>
        /// List a profiles
        /// </summary>
        /// <returns>Object List profiles</returns>
        [HttpGet("list")]
        public IActionResult GetList()
        {
            return Ok(profileBll.GetActives());
        }
        /// <summary>
        /// Get a profile by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>One Profile by id</returns>
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(profileBll.GetById(id));
        }
        /// <summary>
        /// Create a Profile 
        /// </summary>
        /// <param name="profile"></param>
        /// <returns>Code 200</returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Profile profile)=> Ok( await profileBll.Create(profile));
        /// <summary>
        /// Update Profile
        /// </summary>
        /// <param name="profile">Profile domain object</param>
        /// <returns>Code 200</returns>
        [HttpPut]
        public IActionResult Update([FromBody] Profile profile) => Ok(profileBll.Update(profile));
    }
}
