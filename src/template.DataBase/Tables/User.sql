CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserName] VARCHAR(30) NOT NULL UNIQUE, 
    [FullName] VARCHAR(50) NOT NULL, 
    [ProfileId] INT NULL,
    [IsActive] BIT NOT NULL DEFAULT 1,
    [ClientId] INT NULL ,
    [Created] DATE NOT NULL, 
    CONSTRAINT [fk_profile_tblUser_tblProfile] FOREIGN KEY ([ProfileId]) REFERENCES [Profile] ([Id]),
    CONSTRAINT [fk_profile_tblUser_tblClient] FOREIGN KEY ([ClientId]) REFERENCES [Client] ([Id])
)
