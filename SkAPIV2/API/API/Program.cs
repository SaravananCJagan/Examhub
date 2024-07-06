using DAL;
using BLL;
using Mappers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.ConfigureMapperServices();
builder.Services.ConfigureBLLServices();
builder.Services.DALServicesConfiguration(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", builder =>
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

if(app.Environment.IsDevelopment())
    app.UseCors("DevPolicy");

app.MapControllers();

app.Run();
