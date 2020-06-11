# galileo-passport-writer

Create passports based on publication notifications sent from Babel

Will map World Service homes based on taggings in message. News categories are all mapped to the News home at present as there is no other approriate mapping.

All tags are currently created as abouts and it's not feasible to diff without inadvertantly removing edits carried out in passport control. We could query Optimo tag gateway to allow writing of non-ambiguous types such as editorial tone but maybe all the effort we are going to here is a smell that this is not the right approach.

We would have to disable writing tags to LDP to avoid duplicate appearances in streams (one for a passport, one for a new creativework) and in doing so we may need to update the Galileo Tag Publisher to include the tags even where they are not written to LDP - if we are making changes in there, would could do the work of writing to the passport-writer-api there making this redundant...

C'est la vie

## todo

We can't generate a diff as these passports may have been edited in passport control so at best all we can do is add tags where they exist.
