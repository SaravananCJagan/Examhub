using IDAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public static class DALConfigureServices
    {
        public static IServiceCollection DALServicesConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SkExamManagementDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("SkExamManagementConnection")
                    )
            ) ;
            services.AddScoped(typeof(IGenericDAL<>),typeof(GenericDAL<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IExamsConductorDAL, ExamsConductorDAL>();
            services.AddScoped<IExamsDAL, ExamsDAL>();
            return services;
        }
    }
}
