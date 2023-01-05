CREATE PROCEDURE [dbo].[spSelect_LOB]
(
	@Id int = NULL,
	@Name varchar(255) = NULL,
	@IdCLient int = NULL--,
	--@IsActive bit = NULL,
	--@Created date = NULL
)

AS
SET NOCOUNT ON
SELECT IdLOB,
LOBName,
IdCLient
FROM LOB 
WHERE
	(@Id IS NULL OR  IdLOB = @Id)
	AND (@Name IS NULL OR  LOBName = @Name)
	AND (@IdCLient IS NULL OR  IdCLient = @IdCLient)
	--AND (@IsActive IS NULL OR  [IsActive] = @IsActive)
	--AND (@Created IS NULL OR  [Created] = @Created)

