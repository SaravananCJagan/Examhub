using AutoMapper;
using DTOs;
using EntityModels;
using IBLL;
using IDAL;

namespace BLL
{
    public class ExamConductorBLL : IExamConductorBLL
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ExamConductorBLL(
            IUnitOfWork unitOfWork
            ,IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ExamConductorDTO> Add(ExamConductorDTO dto)
        {
            ExamsConductor examsConductor = _mapper.Map<ExamsConductor>(dto);
            ExamsConductor result=await _unitOfWork.examsConductorDAL.Add(examsConductor);
            await _unitOfWork.Save();
            return _mapper.Map<ExamConductorDTO>(result);
        }

        public async Task Delete(ExamConductorDTO dto)
        {
            ExamsConductor examsConductor = _mapper.Map<ExamsConductor>(dto);
            await _unitOfWork.examsConductorDAL.Delete(examsConductor);
            _unitOfWork.SaveSync();
        }

        public async Task<bool> Exists(long id)
        {
            return await _unitOfWork.examsConductorDAL.Exists(id);
        }

        public async Task<ExamConductorDTO> Get(long id)
        {
            return _mapper.Map<ExamConductorDTO>(await _unitOfWork.examsConductorDAL.Get(id));
        }

        public async Task<IReadOnlyList<ExamConductorDTO>> GetAll()
        {
            IReadOnlyList<ExamsConductor> data = await _unitOfWork.examsConductorDAL.GetAll();
            return _mapper.Map<IReadOnlyList<ExamConductorDTO>>(data);
        }

        public async Task Update(ExamConductorDTO dto)
        {
            ExamsConductor examsConductor = _mapper.Map<ExamsConductor>(dto);
            await _unitOfWork.examsConductorDAL.Update(examsConductor);
            _unitOfWork.SaveSync();
        }
    }
}
