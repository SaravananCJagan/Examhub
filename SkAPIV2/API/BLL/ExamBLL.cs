using AutoMapper;
using DTOs;
using EntityModels;
using IBLL;
using IDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class ExamBLL : IExamBLL
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ExamBLL(
            IUnitOfWork unitOfWork
            ,IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ExamDTO> Add(ExamDTO dto)
        {
            Exams exams = _mapper.Map<Exams>(dto);
            Exams result=await _unitOfWork.examsDAL.Add(exams);
            await _unitOfWork.Save();
            return _mapper.Map<ExamDTO>(result);
        }

        public async Task Delete(ExamDTO dto)
        {
            Exams exams = _mapper.Map<Exams>(dto);
            await _unitOfWork.examsDAL.Delete(exams);
            _unitOfWork.SaveSync();
        }

        public async Task<bool> Exists(long id)
        {
            return await _unitOfWork.examsDAL.Exists(id);
        }

        public async Task<ExamDTO> Get(long id)
        {
            return _mapper.Map<ExamDTO>(await _unitOfWork.examsDAL.Get(id));
        }

        public async Task<List<ExamDTO>> GetAll()
        {
            return _mapper.Map<List<ExamDTO>>(await _unitOfWork.examsDAL.GetAll());
        }

        public async Task Update(ExamDTO dto)
        {
            Exams exams = _mapper.Map<Exams>(dto);
            await _unitOfWork.examsDAL.Update(exams);
            _unitOfWork.SaveSync();
        }
        public List<ExamDTO> GetExamsByFilter(ExamFilterDTO filter)
        {
            ExamFilter examFilters=_mapper.Map<ExamFilter>(filter);
            return _mapper.Map<List<ExamDTO>>(_unitOfWork.examsDAL.GetExamsByFilter(examFilters));
        }
    }
}
