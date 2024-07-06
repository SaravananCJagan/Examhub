using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IDAL
{
    public interface IUnitOfWork
    {
        IExamsConductorDAL examsConductorDAL { get; }
        IExamsDAL examsDAL { get; }
        Task Save();
        int? SaveSync();
    }
}
