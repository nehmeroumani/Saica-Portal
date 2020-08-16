import englishMessages from 'ra-language-english';

export default {
    ...englishMessages, 
    resources: {
        general:{
            appname:'Semi-Automated Interface for Content Annotation',
            configuration:'Language',
            language:'Language',
            active:'Active',
            search:'Search',
            displayOrder:'Order',
            back:'back',
            next:'next',
            done:'Done', 
            name:'name',
            task: 'Task'
        },
        agreement:{
name:'Agreement'
        },
        annotations:{
            taskNumber:' Task Number ',
            text:'Text',
            removeDimension:'Remove Answer',
            isIrrelevent:'isIrrelevent',
            confidence:'Confidence',
            totalAnnotations:'Total Annotations',
            name:'Tasks',
            taskDuration:"Task Duration",
            monitor:'Task Details',
            annotationtask:"Tasks",
            status:'Status',
            startTime:'Start Time',
            finishTime:'Finish Time',
            taskDone: 'Finish Task'
        },
        annotationTask:{
            nameItem:'Task',
            tweets:'Tweets',
            name:'Name',
            user:'Annotator',
            totalTweets:'Total Tweets',
            doneTweets:'Done Tweets',
            status:'Status',
            startTweetId:'Start Tweet',
            endTweetId:'End Tweet',
        },
        words:{
            name:'Words'
        }
        ,        
        levelOfConfidence:{
            name:'Confidence'
        },
         twitter:{
            tweet:'Tweet',
            name:'Twitter'
        }
        ,
        category:{
            name:'Categories',
            category:'Category',
            color: 'Color'
        }
        ,
        dimension:{
            nameAr:'Sub-category ar',
            nameEn:'Sub-category en',
            choose:'Choose ',
            name:'Sub-categories',
            nameitem:'Sub-category',
            add:'Add sub-category',
            chooselevel:'Confidence'
        }
                ,
        users:{
            statistics:'Statistics',
            user:'User',
            name:'Users',
            username:'Name',
            role:'Role',
            annotations:'Annotations',
            avgLevelOfConfidence:'Avg Per Confidence'
        },
        statistics:{
            tweetDone:'Tweet Done',
            tweetRemaining:'Tweet Remaining',
            donePercentage:'Done Percentage',
            workMinutes:'Work Minutes',
            averagePerTweet:'Avg Per Tweet',
            avgLevelOfConfidence:'Avg Per Confidence'
        }      
        ,
        reporting:{
            name:'Reporting'
        },
        status:{
            new:'New',progress:'Progress',done:'Done'
        }
    }   
};