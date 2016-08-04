###fis-发布过滤插件，只发布指定文件与其依赖文件

####使用方法：
1. 在preprocessor中引入该插件
	 例：
	 ```
	 modules: {
           postpackager: ['deploy-filter']
         }
     ```
2. 在settings中配置参数
     例：
     ```
     settings: {
           postpackager: {
             'deploy-filter': {
                 include: [
                   'views/index/index.html',
                   'views/detail/detail.html',
                   'views/subject/subject.html',
                   'views/feed-app/feed-app.html',
                   'views/new-app/app.html'
                 ]
             },
           }   
     ```
     或者
     ```
      settings: {
            postpackager: {
               'deploy-filter': {
                  include: 'views/index/index.html'
               },
            }   
      ```
        