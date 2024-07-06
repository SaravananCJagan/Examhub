using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IBLL
{
    public interface IExamConductorBLL
    {
        Task<ExamConductorDTO> Add(ExamConductorDTO dto);
        Task<ExamConductorDTO> Get(long id);
        Task<IReadOnlyList<ExamConductorDTO>> GetAll();
        Task<bool> Exists(long id);
        Task Update(ExamConductorDTO entity);
        Task Delete(ExamConductorDTO entity);
    }
}
