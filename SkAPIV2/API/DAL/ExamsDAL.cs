using EntityModels;
using IDAL;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ExamsDAL : GenericDAL<Exams>, IExamsDAL
    {
        private readonly SkExamManagementDbContext _context;
        public ExamsDAL(SkExamManagementDbContext context):base(context) { 
            _context = context;
        }

        public override async Task<Exams> Add(Exams entity)
        {
            await _context.AddAsync(entity);
            _context.Entry(entity.ExamBody).State= EntityState.Unchanged;
            return entity;
        }

        public List<Exams> GetExamsByFilter(ExamFilter examFilter)
        {
            List <Exams> exams= null;
            ExpressionStarter<Exams> filter = BuildFilterExpressions(examFilter);
            exams=_context.Exams.Include(i=>i.ExamBody).Where(filter).ToList();
            return exams;
        }
        private ExpressionStarter<Exams> BuildFilterExpressions(ExamFilter examFilter)
        {
            var predicate = PredicateBuilder.New<Exams>();
            if (examFilter == null)
                throw new ArgumentNullException("Exam Filter is null");
            if (!string.IsNullOrEmpty(examFilter.ExamBodyId))
            {
                predicate = predicate.And(exam => exam.ExamBody.Id.Equals(examFilter.ExamBodyId));
            }
            if (examFilter.CommencementDateFrom != null)
            {
                predicate = predicate.And(exam => exam.CommencementDate >= examFilter.CommencementDateFrom);
            }
            if (examFilter.CommencementDateTo != null)
            {
                predicate = predicate.And(exam => exam.CommencementDate <= examFilter.CommencementDateTo);
            }
            if (examFilter.ApplicationLastDateFrom != null)
            {
                predicate = predicate.And(exam => exam.ApplicationLastDate >= examFilter.ApplicationLastDateFrom);
            }
            if (examFilter.ApplicationLastDateTo != null)
            {
                predicate = predicate.And(exam => exam.ApplicationLastDate <= examFilter.ApplicationLastDateTo);
            }
            if (examFilter.NotificationDateFrom != null)
            {
                predicate = predicate.And(exam => exam.NotificationDate >= examFilter.NotificationDateFrom);
            }
            if (examFilter.NotificationDateTo != null)
            {
                predicate = predicate.And(exam => exam.NotificationDate <= examFilter.NotificationDateTo);
            }
            if (!string.IsNullOrEmpty(examFilter.State))
            {
                predicate = predicate.And(exam => exam.State.Equals(examFilter.State));
            }
            if (examFilter.AgeLimitFrom != null)
            {
                predicate = predicate.And(exams => exams.AgeLimit >= examFilter.AgeLimitFrom);
            }
            if (examFilter.AgeLimitTo != null)
            {
                predicate = predicate.And(exams => exams.AgeLimit <= examFilter.AgeLimitTo);
            }
            if (examFilter.VacanciesFrom != null)
            {
                predicate = predicate.And(exams => exams.Vacancies >= examFilter.VacanciesFrom);
            }
            if (examFilter.VacanciesTo != null)
            {
                predicate = predicate.And(exams => exams.Vacancies <= examFilter.VacanciesTo);
            }
            if (!string.IsNullOrEmpty(examFilter.EducationalQualifications))
            {
                predicate = predicate.And(exam => exam.EducationalQualifications.Contains(examFilter.EducationalQualifications));
            }
            return predicate;
        }
    }
}
