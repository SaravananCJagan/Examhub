using EntityModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class AuditDbContext:DbContext
    {
        public AuditDbContext(DbContextOptions options):base(options)
        {
            
        }
        public virtual async Task<int> SaveChanges()
        {
            foreach (var entry in base.ChangeTracker.Entries<BaseEntity>().Where(w=>w.State.Equals(EntityState.Added) || w.State.Equals(EntityState.Modified)))
            {
                entry.Entity.LastModified = DateTime.Now;
            }
            return await base.SaveChangesAsync();
        }
        public int SaveChangesSync()
        {
            foreach (var entry in base.ChangeTracker.Entries<BaseEntity>().Where(w => w.State.Equals(EntityState.Added) || w.State.Equals(EntityState.Modified)))
            {
                entry.Entity.LastModified = DateTime.Now;
            }
            return base.SaveChanges();
        }
    }
}
