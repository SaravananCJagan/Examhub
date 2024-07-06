using EntityModels;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class SkExamManagementDbContext:AuditDbContext
    {
        public SkExamManagementDbContext(DbContextOptions dbContextOptions):base(dbContextOptions)
        {
        }
        public DbSet<ExamsConductor> ExamsConductor { get; set; }
        public DbSet<Exams> Exams { get; set; }
    }
}