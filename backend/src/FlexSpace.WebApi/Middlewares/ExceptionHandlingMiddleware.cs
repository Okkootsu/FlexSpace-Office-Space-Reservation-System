using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using CustomValidationException = FlexSpace.Application.Common.Exceptions.ValidationException;
using FluentValidationException = FluentValidation.ValidationException;

namespace FlexSpace.WebApi.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/problem+json";

            var (statusCode, problemDetails) = exception switch
            {
                CustomValidationException customValEx => (
                    (int)HttpStatusCode.BadRequest,
                    (object)new ValidationProblemDetails(customValEx.Errors)
                    {
                        Status = (int)HttpStatusCode.BadRequest,
                        Title = "Validation Failure",
                        Detail = "Bir veya daha fazla doğrulama hatası meydana geldi."
                    }
                ),
                FluentValidationException fluentValEx => (
                    (int)HttpStatusCode.BadRequest,
                    (object)new ValidationProblemDetails(
                        fluentValEx.Errors
                            .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                            .ToDictionary(g => g.Key, g => g.ToArray())
                    )
                    {
                        Status = (int)HttpStatusCode.BadRequest,
                        Title = "Validation Failure",
                        Detail = "Bir veya daha fazla doğrulama hatası meydana geldi."
                    }
                ),
                InvalidOperationException opEx => (
                    (int)HttpStatusCode.Conflict,
                    new ProblemDetails
                    {
                        Status = (int)HttpStatusCode.Conflict,
                        Title = "Business Rule Violation",
                        Detail = opEx.Message
                    }
                ),
                _ => (
                    (int)HttpStatusCode.InternalServerError,
                    new ProblemDetails
                    {
                        Status = (int)HttpStatusCode.InternalServerError,
                        Title = "Server Error",
                        Detail = "Beklenmeyen bir sunucu hatası oluştu."
                    }
                )
            };

            if (statusCode == (int)HttpStatusCode.InternalServerError)
            {
                _logger.LogError(exception, "İşlenmeyen istisna: {Message}", exception.Message);
            }

            context.Response.StatusCode = statusCode;
            var json = JsonSerializer.Serialize(problemDetails);
            await context.Response.WriteAsync(json);
        }
    }
}