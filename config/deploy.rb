require 'capistrano/ext/multistage'

set :stages,        %w(stable)
set :default_stage, 'stable'
set :primary_url, 	'node.as24.int'
set :user,    		'node'
set :use_sudo, 		false

set :scm,        	:none
set :repository, 	'.'
set :deploy_via, 	:copy
set (:deploy_to) 	{ "/data/www/#{ user }/app/#{ primary_url }/" }

set :keep_releases, 5
set :copy_exclude,  ['.svn', '.DS_Store', '.git']

after "deploy:symlink", "copy_upstart", "run", "start_monit"

desc "Start node daemon"
task :run do
  run("sudo start Monitoring-Notifications")
end

desc "Set up monitoring of node daemon with monit"
task :start_monit do
  run("monit -d 60 -c #{current_path}/monit.conf")
end

desc "Copy upstart script to /etc/init"
task :copy_upstart do
  run("sudo cp #{current_path}/upstart.conf /etc/init/Monitoring-Notifications.conf")
end

