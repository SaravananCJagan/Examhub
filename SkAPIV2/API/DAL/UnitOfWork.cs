using IDAL;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        public readonly SkExamManagementDbContext _context;
        private IExamsConductorDAL _conductorDAL;
        private IExamsDAL _examsDAL;
        public UnitOfWork(SkExamManagementDbContext context)
        {
            _context = context;
        }
        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public Task Save()
        {
            return _context?.SaveChanges();
        }
        public int? SaveSync()
        {
            return _context?.SaveChangesSync();
        }

        public IExamsConductorDAL examsConductorDAL => _conductorDAL ??= new ExamsConductorDAL(_context);
        public IExamsDAL examsDAL => _examsDAL ??= new ExamsDAL(_context);
    }
}
