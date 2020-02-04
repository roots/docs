# Vagrantfile

The example `Vagrantfile` in this project can be kept in this folder or moved anywhere else such as a project/site folder. Generally, if you want to have multiple sites on 1 Vagrant VM, you should keep the `Vagrantfile` where it is (in the trellis dir). If you want to have 1 Vagrant VM *PER- project/site, you should make copies of the `Vagrantfile` and put them into each project's dir. You'd then run `vagrant up` from the project-specific directory.

Edit `vagrant.default.yml` to modify configuration settings.
