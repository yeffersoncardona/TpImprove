using Business.Services;
using Domain.DTOs;
using Domain.Entities;
using Domain.Util;
using Microsoft.AspNetCore.Mvc;

namespace APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        ProjectBLL projectBll = new ProjectBLL();
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(projectBll.GetAll());
        }
        [HttpGet("list")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Project>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetList()
        {
            return Ok(projectBll.GetAvaiables());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Project))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(int id)
        {
            var response = projectBll.GetById(id);
            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Project))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Create( ProjectDTO project)
        {

            return Ok(projectBll.Create(project));
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Update([FromBody] Project project)
        {
            Output response = projectBll.Update(project);
            if (response.Code == 0) return Ok(response);

            return BadRequest(response);
        }
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Output))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Delete(int id)
        {
            Output output = projectBll.Delete(id);
            if (output.Code == 0)
            {
                return Ok(output);
            }

            return BadRequest(output);
        }
        [HttpGet("GetProjectsByLob/{idLOB}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Project>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetProjectsByLOB(int idLOB)
        {
            var response = projectBll.GetProjectsByLOB(idLOB);
            return Ok(response);
        }

    }
}
