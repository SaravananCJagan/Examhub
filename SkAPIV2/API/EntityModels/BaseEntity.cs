using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityModels
{
    public abstract class BaseEntity
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTime? LastModified { get; set; }
    }
}
