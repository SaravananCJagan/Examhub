using DTOs;
using IBLL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/exambody")]
    [ApiController]
    public class ExamConductorController : ControllerBase
    {
        private readonly IExamConductorBLL _examConductorBLL;
        public ExamConductorController(IExamConductorBLL examConductorBLL)
        {
            _examConductorBLL = examConductorBLL;
        }
        // GET: api/exambody
        [HttpGet]
        [Route("read")]
        public async Task<IReadOnlyList<ExamConductorDTO>> Get()
        {
            return await _examConductorBLL.GetAll();
        }

        // GET api/exambody/5
        [HttpGet]
        [Route("readbyid")]
        public async Task<ExamConductorDTO> Get(long id)
        {
            return await _examConductorBLL.Get(id);
        }

        // POST api/exambody
        [HttpPost]
        [Route("create")]
        public async Task<ExamConductorDTO> Post([FromBody] ExamConductorDTO value)
        {
            return await _examConductorBLL.Add(value);
        }

        // PUT api/exambody/5
        [HttpPut]
        [Route("update")]
        public async void Put([FromBody] ExamConductorDTO value)
        {
            await _examConductorBLL.Update(value);
        }

        // DELETE api/exambody/5
        [HttpDelete]
        [Route("delete")]
        public async void Delete([FromBody] ExamConductorDTO value)
        {
            await _examConductorBLL.Delete(value);
        }
    }
}
