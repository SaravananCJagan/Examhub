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
        private readonly IExamConductorBLL _examconductorBLL;
        public ExamsController(IExamBLL examBLL, IExamConductorBLL examConductorBLL)
        {
            _examBLL = examBLL;
            _examconductorBLL= examConductorBLL;
        }

        [HttpGet]
        [Route("read")]
        public async Task<IReadOnlyList<ExamDTO>> Get()
        {
            return await _examBLL.GetAll();
        }
        
        [HttpGet]
        [Route("readbyid")]
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
        [Route("search")]
        public List<ExamDTO> SearchExams([FromBody] ExamFilterDTO examFilterDTO)
        {
            return _examBLL.GetExamsByFilter(examFilterDTO);
        }

        // PUT api/exambody/5
        [HttpPut]
        [Route("update")]
        public async void Put([FromBody] ExamDTO value)
        {
            await _examBLL.Update(value);
        }

        // DELETE api/exambody/5
        [HttpDelete]
        [Route("delete")]
        public async void Delete([FromBody] ExamDTO value)
        {
            await _examBLL.Delete(value);
        }
    }
}
