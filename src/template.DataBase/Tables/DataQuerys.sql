CREATE TABLE [dbo].[DataQuerys]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserName] VARCHAR(255) NOT NULL, 
    [StartDate] DATETIME NOT NULL, 
    [EndDate] DATETIME NOT NULL, 
    [Sigma] FLOAT NULL, 
    [CoefficientVariation] FLOAT NULL, 
    [Kpi] VARCHAR(255) NULL, 
    [TargetKpi] VARCHAR(255) NULL
)
