using EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDAL
{
    public interface IExamsDAL:IGenericDAL<Exams>
    {
        List<Exams> GetExamsByFilter(ExamFilter examFilter);
    }
}
