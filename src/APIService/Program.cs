using APIService.Extensions;
using APIService.Utils;

SessionHandler.Initialize();

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfiguringAuthentication(builder.Configuration);
builder.Services.ConfiguringControllers();
builder.Services.AddServices();
builder.Services.ConfiguringSwagger();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddMemoryCache();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            );
});

builder.Services.AddDistributedMemoryCache();

// Session handler parameters
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});



var app = builder.Build();

#if DEBUG
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
#endif


app.UseCors("AllowOrigin");

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
    context.Response.Headers.Add("X-Frame-Options", "AllowOrigin");
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("Referrer-Policy", "no-referrer");
    context.Response.Headers.Add("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()");
    context.Response.Headers.Add("Content-Security-Policy", "default-src 'self';");
    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
    await next(context);
});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseSession();

app.Run();