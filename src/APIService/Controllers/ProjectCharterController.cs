using Business.Services;
using Domain.DTOs;
using Domain.Entities;
using Domain.Util;
using Microsoft.AspNetCore.Mvc;


namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectCharterController : ControllerBase
    {

        private ProjectCharterBLL projectcharterBll = new();
        /// <summary>
        /// get all charters
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ProjectCharter>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetAll()
        {
            return Ok(projectcharterBll.GetAll());
        }
        [HttpGet("list")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ProjectCharter>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetList()
        {
            return Ok(projectcharterBll.GetAvaiables());
        }
        /// <summary>
        /// get one charter by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>one charter register</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProjectCharter))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(int id)
        {
            return Ok(projectcharterBll.GetByIdProjectCharter(id));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProjectCharter))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Create([FromBody] ProjectCharterDTO projectcharterdto) => 
            Ok(await projectcharterBll.Create(projectcharterdto));

        /// <summary>
        /// update charter
        /// </summary>
        /// <param name="projectcharterdto"></param>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProjectCharter))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Update([FromBody] ProjectCharterDTO projectcharterdto)
        {
            //project.IdUser = int.Parse(User.FindFirst("userId").Value);
            Output response = projectcharterBll.Update(projectcharterdto);
            if (response.Code == 0) return Ok(response);

            return BadRequest(response);
        }
        /// <summary>
        /// delete charter by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            Output response = projectcharterBll.Delete(id);
            if (response.Code == 0)
            {
                return Ok(response);
            }

            return BadRequest(response);
        }
        /// <summary>
        /// get charter by project
        /// </summary>
        /// <param name="idproject"></param>
        /// <returns></returns>
        [HttpGet("GetCharterId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProjectCharter))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetCharterId(int idproject)
        {
            return Ok(projectcharterBll.GetCharterId(idproject));
        }
    }
}
