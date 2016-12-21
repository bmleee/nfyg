#!/bin/bash

# http://askubuntu.com/questions/20508/script-for-an-incremental-file-system-backup

unset PATH  # suggestion from H. Milz: avoid accidental use of $PATH

# ------------- system commands used by this script --------------------
ID=/usr/bin/id;
ECHO=/bin/echo;

MOUNT=/bin/mount;
RM=/bin/rm;
MV=/bin/mv;
CP=/bin/cp;
TOUCH=/bin/touch;
MKDIR=/bin/mkdir;

RSYNC=/usr/bin/rsync;

# ------------- file locations -----------------------------------------

MOUNT_DEVICE=./src;
SNAPSHOT_RW=./backup;

# ------------- variables ----------------------------------------------

MAX_FILES=24;

# mkdir
$MKDIR -p $SNAPSHOT_RW/


# rotating snapshots of ./src fixme: this should be more general)

# step 1: delete the oldest snapshot, if it exists:
if [ -d $SNAPSHOT_RW/hourly.24 ] ; then           \
  $RM -rf $SNAPSHOT_RW/hourly.24 ;               \
fi ;

# step 2: shift the middle snapshots(s) back by one, if they exist
for ((i=$MAX_FILES;i>=0;i--)); do \
  if [ -d "$SNAPSHOT_RW/hourly.$((i))" ] ; then \
    $MV $SNAPSHOT_RW/hourly.$((i)) $SNAPSHOT_RW/hourly.$((i+1));        \
  fi ;
done

# step 4: rsync from the system into the latest snapshot (notice that
# rsync behaves like cp --remove-destination by default, so the destination
# is unlinked first.  If it were not so, this would copy over the other
# snapshot(s) too!
$RSYNC                              \
      -va --delete --delete-excluded              \
      --exclude-from="$EXCLUDES"              \
      ./src $SNAPSHOT_RW/hourly.0 ;
