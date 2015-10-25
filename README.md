
#npoco

npoco is a node.js command tools to generate petapoco(micro-ORM) classes for .NET and Mono


Currently,**npoco** only support mysql database.


See here - https://github.com/toptensoftware/PetaPoco - for PetaPoco details.


##Features


###support 

- Mysql 


##usage

1.install  npoco
	
	npm install -g npoco

1.init a config 

	npoco init


2.gen PetaPoco's code

	npoco gen
	

###help



   - npoco -help
   - npoco init -h
   - npoco gen -h
  
  
##In .Net/Mono Project


###usage

1.add PetaPoco.cs

https://github.com/toptensoftware/PetaPoco/blob/master/PetaPoco/PetaPoco.cs
 
Download [PetaPoco](https://github.com/toptensoftware/PetaPoco) and copy `master/PetaPoco/PetaPoco.cs` to your project


2.copy generate `Database.cs` file to your project



3.web.config or app.config 

```
 <connectionStrings>
    <add name="PetaPocoDb" connectionString="server=localhost;User Id=root;password=pass;database=db;" providerName="MySql.Data.MySqlClient" />
  </connectionStrings>
  
  <system.data>
    <DbProviderFactories>
      <remove invariant="MySql.Data.MySqlClient" />
      <add name="MySQL Data Provider" invariant="MySql.Data.MySqlClient" description=".Net Framework Data Provider for MySQL" type="MySql.Data.MySqlClient.MySqlClientFactory, MySql.Data, Version=6.9.8.0, Culture=neutral, PublicKeyToken=c5687fc88969c44d" />
    </DbProviderFactories>
  </system.data>
```



> PetaPoco Usage :http://www.toptensoftware.com/petapoco/

  
   
   
 