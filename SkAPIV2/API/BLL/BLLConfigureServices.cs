using AutoMapper;
using IBLL;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public static class BLLConfigureServices
    {
        public static IServiceCollection ConfigureBLLServices(this IServiceCollection services)
        {
            services.AddScoped<IExamConductorBLL, ExamConductorBLL>();
            services.AddScoped<IExamBLL, ExamBLL>();
            return services;
        }
    }
}
