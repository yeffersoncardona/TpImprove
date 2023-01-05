using Microsoft.AspNetCore.Mvc;
using Domain.Util;
using Business.Services;
using Domain.Entities;

namespace APIService.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserBll userBll = new ();
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns>List of users</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<User>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(userBll.GetAll());
            }
            catch (Exception ex)
            {

               throw ex;
            }
            
        }
        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>Object User</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetOne(int id)
        {
            try { return Ok(userBll.GetById(id)); }
            catch { return BadRequest(); }
        }
        /// <summary>
        /// Create a User
        /// </summary>
        /// <param name="user"></param>
        /// <returns>200 Code</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Create([FromBody] User user)
        {
            Output response = await userBll.Create(user);
            if (response.Code != 0) return BadRequest(response);
            else return Ok(response);
        }
        /// <summary>
        /// Update User values
        /// </summary>
        /// <param name="user"></param>
        /// <returns>200 Code</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Update([FromBody] User user)
        {
            Output response = userBll.Update(user);
            if (response.Code != 0) return BadRequest(response);
            else return Ok(response);
        }
    }
}
