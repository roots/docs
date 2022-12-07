# Vagrant

## Providers

Trellis supports most of Vagrant's common [providers](https://www.vagrantup.com/docs/providers) automatically. By default we recommend VirtualBox since it's free and open source. However, if you prefer some of the commercial products like VMWare or Parallels, feel free to use them.

This main exception here is for developers on Macs with Apple Silicon (M1)
chips. Because these are ARM-based CPUs, VirtualBox won't work; it's limited to
x86 CPUs like Intel and AMD.

### Parallels (Apple Silicon (M1) Macs)

Currently Parallels is the best solution for running virtual machines on Apple
Silicon based Macs. Unfortunately, Parallels is a paid and commercial product
unlike VirtualBox. Parallels **Pro** is required as well which has a yearly
subscription price of
$99 USD.

::: tip
If you'd like to support Roots, please [purchase Parallels Pro through our affiliate link](https://prf.hn/l/KzkNLZB)
:::

Installation:

1. Purchase Parallels Pro
2. Install Parallels
3. Install the Vagrant provider: `vagrant plugin install vagrant-parallels`

See the [Parallels site](https://parallels.github.io/vagrant-parallels/docs/) for
more details.

## Configuration

Editing the `Vagrantfile` directly should be avoided unless necessary. Instead,
you can easily set common settings in `vagrant.default.yml`.

To make _local_ overrides, create a `vagrant.local.yml` file with any overrides
you want. Note: this file is Git ignored.

## Vagrantfile

The example `Vagrantfile` in this project can be kept in this folder or moved anywhere else such as a project/site folder. Generally, if you want to have multiple sites on 1 Vagrant VM, you should keep the `Vagrantfile` where it is (in the trellis dir). If you want to have 1 Vagrant VM _per_ project/site, you should make copies of the `Vagrantfile` and put them into each project's dir. You'd then run `vagrant up` from the project-specific directory.

## NFS

For more NFS details and troubleshooting, see the official [Vagrant docs](https://www.vagrantup.com/docs/synced-folders/nfs).

## Mount types

The shared folder mount type can be set in the `vagrant.default.yml` file. While `nfs` is the default mount type, it has been observed important I/O performance gains on Linux hosts, by using `virtuabox` mount type instead, up to 9x faster write and 25x faster read.

 We suggest you try by yourself and see what works best for you. Just switch the mount type and `vagrant reload`. See [this issue](https://github.com/roots/trellis/issues/1428) for details and tests results.
