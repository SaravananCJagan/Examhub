using DTOs;
using EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IBLL
{
    public interface IExamBLL
    {
        Task<ExamDTO> Add(ExamDTO dto);
        Task<ExamDTO> Get(long id);
        Task<List<ExamDTO>> GetAll();
        Task<bool> Exists(long id);
        Task Update(ExamDTO entity);
        Task Delete(ExamDTO entity);
        List<ExamDTO> GetExamsByFilter(ExamFilterDTO examFilter);
    }
}
