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

#after "deploy:symlink" #, "set_cron_d", "fix_permissions", "deploy_monitoring"

desc "Set crontab from files in cron.d"
task :set_cron_d, :roles => [:cronjobs] do
  run("/usr/bin/crontab -r || /bin/true")
  run("/bin/cat #{ current_path }/cron.d/* | /usr/bin/crontab -")
end

desc "Make sh-Files excutable"
task :fix_permissions do
  run("/bin/chmod 764 #{current_path}/bayes/scripte/*.sh")
end

desc "Deploy monitoring stuff"
task :deploy_monitoring do
  # copy property files first
  run("sudo cp #{current_path}/monitoring/properties/#{stage}/bayes4rating_*.prop /etc/as24/prtg/properties.unmanaged/")
  
  # copy sql files, too
  run("sudo cp #{current_path}/monitoring/sql/#{stage}/bayes4rating_*.sql /opt/as24/prtg/sql/unmanaged/")
end