namespace Bussiness.Exceptions;
public abstract class CustomException : Exception
{
    public CustomException(string message) : base(message) { }
    public abstract int StatusCode { get; }
    public abstract object Error { get; }
}

public class ValidationException : CustomException
{
    public ValidationException(string message) : base(message) { }
    public override int StatusCode => 400;
    public override object Error => new { error = Message };
}

public class NotFoundException : CustomException
{
    public NotFoundException(string message) : base(message) { }
    public override int StatusCode => 404;
    public override object Error => new { error = Message };
}

public class UnauthorizedException : CustomException
{
    public UnauthorizedException(string message) : base(message) { }
    public override int StatusCode => 401;
    public override object Error => new { error = Message };
}


public class ForbiddenException : CustomException
{
    public ForbiddenException(string message) : base(message) { }
    public override int StatusCode => 403;
    public override object Error => new { error = Message };
}

public class UnsoportedMediaTypeException : CustomException
{
    public UnsoportedMediaTypeException(string message) : base(message) { }
    public override int StatusCode => 403;
    public override object Error => new { error = Message };
}

