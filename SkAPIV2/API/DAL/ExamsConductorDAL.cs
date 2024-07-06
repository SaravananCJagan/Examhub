using EntityModels;
using IDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ExamsConductorDAL:GenericDAL<ExamsConductor>,IExamsConductorDAL
    {
        public ExamsConductorDAL(SkExamManagementDbContext context):base(context)
        {
            
        }
    }
}
