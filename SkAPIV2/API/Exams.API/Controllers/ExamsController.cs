using DTOs;
using IBLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exams.API.Controllers
{
    [Route("api/exams")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly IExamBLL _examBLL;
        public ExamsController(IExamBLL examBLL)
        {
            _examBLL = examBLL;
        }
        // GET: api/exambody
        [HttpGet]
        public async Task<IReadOnlyList<ExamDTO>> Get()
        {
            return await _examBLL.GetAll();
        }

        // GET api/exambody/5
        [HttpGet("{id}")]
        public async Task<ExamDTO> Get(long id)
        {
            return await _examBLL.Get(id);
        }

        // POST api/exambody
        [HttpPost]
        [Route("create")]
        public async Task<ExamDTO> Post([FromBody] ExamDTO value)
        {
            return await _examBLL.Add(value);
        }

        [HttpPost]
        [Route("Search")]
        public List<ExamDTO> SearchExams([FromBody] ExamFilterDTO examFilterDTO)
        {
            return _examBLL.GetExamsByFilter(examFilterDTO);
        }

        // PUT api/exambody/5
        [HttpPut]
        public async void Put([FromBody] ExamDTO value)
        {
            await _examBLL.Update(value);
        }

        // DELETE api/exambody/5
        [HttpDelete]
        public async void Delete([FromBody] ExamDTO value)
        {
            await _examBLL.Delete(value);
        }
    }
}
