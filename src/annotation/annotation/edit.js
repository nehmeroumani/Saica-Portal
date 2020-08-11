import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/RadioButtonChecked';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Radio from '@material-ui/core/Radio';
import { Redirect } from 'react-router';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { keyHandler, KEYPRESS } from 'react-key-handler';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudDone from '@material-ui/icons/CloudDone';

import { DELETE, UPDATE, CREATE, translate, GET_LIST, GET_ONE, GET_MANY, Responsive, withDataProvider, EditController } from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { connect } from 'react-redux';
import { change, submit, reset, isSubmitting } from 'redux-form';
import Checkbox from '@material-ui/core/Checkbox';
import analytics from "../../helpers/analytics";
import TouchApp from '@material-ui/icons/TouchApp';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import TweetText from '../../twitter/TweetText'

import {
  fetchEnd,
  fetchStart,
  required,
  CreateButton,
  showNotification,
  SaveButton,
  REDUX_FORM_NAME
} from 'react-admin';

import compose from 'recompose/compose';
const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: 0,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});
const Status = props => {
  if (props.status == 10) {
    return <span className="mh-status-annotation mh-status-gray" >{props.translate('resources.status.new')}</span>
  }
  else if (props.status == 20) {
    return <span className="mh-status-annotation mh-status-yellow" >{props.translate('resources.status.progress')}</span>
  }
  else if (props.status == 30) {
    return <span className="mh-status-annotation mh-status-green" >{props.translate('resources.status.done')}</span>
  }
  return <span>_</span>
};
const Color = props => {
  if (props.category.color) {
    return <span className={'sp-color-label mx-5px'} style={{ backgroundColor: props.category.color }} >
      {props.category.annotations?props.category.annotations.length + '':''}
      {/* {props.category.selectedWords && props.category.selectedWords.length > 0 ? props.category.selectedWords.length + '' : ''} */}
    </span>
  }
  return ''
};
class AnnotationForm extends Component {
  constructor(props) {
    super(props);
    this.detectKey = this.detectKey.bind(this);
  }

  state = {
    redirect: null,
    showFinishPopUp: false,
    annotationTaskUserTweet: null,
    annotationTaskUserTweetId: 0,
    showWordsKeyboard: false,
    showDimensionKeyboard: false,
    levelOfConfidence: '',
    selectedCategoryIndex: 0,
    selectedCategory: '',
    selectedWords: [],
    words: [],
    isSubmitting: false,
    levelsOfConfidence: [],
    isIrrelevant: false, levelOfConfidenceId: 0,
    chooseSentence: false, // false means word selection else sentence 
    possibleSentence: {},
    minMaxSentenceIndexes: null,
    //selectedDimensions:[]
  };

  async fetchData(id) {
    const { dataProvider } = this.props;
    //clear old data

    this.setState({
      levelsOfConfidence: [],
      selectedWords: [],
      annotationTaskUserTweet: null,
      tweet: null,
      categories: [],
      words: [],
      selectedCategory: null
    });

    /* fetch all the data */

    // fetch annotationTaskUserTweet  

    let annotationTaskUserTweet = await this.fetchAnnotationTask(id, dataProvider);

    //fetch level of confidences
    fetchStart();
    const { data: status_agregates } = await dataProvider(
      GET_LIST,
      'annotationTaskUserTweet',
      {
        filter: { 'UserId': annotationTaskUserTweet.userId, 'statistics-status': 'statistics-status' },
        sort: { field: 'Status', order: 'ASC' },
        pagination: { page: 1, perPage: 30 },
      }
    ).finally(() => {
      // Dispatch an action letting react-admin know a API call has ended
      fetchEnd();
    });

    //fetch level of confidences
    fetchStart();
    const { data: levelsOfConfidence } = await dataProvider(
      GET_LIST,
      'levelOfConfidence',
      {
        filter: {},
        sort: { field: 'displayOrder', order: 'ASC' },
        pagination: { page: 1, perPage: 30 },
      }
    ).finally(() => {
      // Dispatch an action letting react-admin know a API call has ended
      fetchEnd();
    });

    // fetch tweet
    fetchStart();
    const { data: tweet } = await dataProvider(
      GET_ONE,
      'tweet',
      { id: annotationTaskUserTweet.tweetId }
    ).finally(() => {
      // Dispatch an action letting react-admin know a API call has ended
      fetchEnd();
    });

    // fetch categories
    fetchStart();
    const { data: categories } = await dataProvider(
      GET_LIST,
      'category',
      {
        filter: { customWithDimentions: true },
        sort: { field: 'displayOrder', order: 'ASC' },
        pagination: { page: 1, perPage: 30 },
      }
    ).finally(() => {
      // Dispatch an action letting react-admin know a API call has ended
      fetchEnd();
    });

    // mapping words for ui usage
    let words = tweet.tweetWords.map((t, i) => {
      let mapped = {};
      mapped.id = t.id;
      mapped.index = i + 1;
      mapped.name = t.wordName;
      return mapped;
    });

    // filter categories with valid dimension
    let validCategories = categories.filter(x => x.dimensions.length > 0);

    let lang = localStorage.getItem('lang');
    let nameParam = 'name';
    if (lang === 'en')
      nameParam = 'nameEn';

    let selectedWords = [];

    for (var c in validCategories) {
      var category = validCategories[c];
      category.name = category[nameParam];
      category.selectedDimensionIds = [];
      for (var dd in category.dimensions) {
        var dn = category.dimensions[dd];
        dn.name = dn[nameParam];
      }
      if (annotationTaskUserTweet.annotations) {
        category.annotations = annotationTaskUserTweet.annotations.filter(x => x.categoryId == category.id);
        category.annotations.forEach(annotation => {
          category.selectedWords = [];
          // select the selected
          annotation.annotationReasons.forEach(reason => {
            reason.annotationReasonWords.forEach(x => {
              let w = {
                id: x.tweetWordId,
                color: category.color,
                categoryId: category.id,
                dimensionId: annotation.dimensionId,
                annotationReasonId: x.annotationReasonId,
                annotationId: annotation.id
              };
              selectedWords.push(w);
              category.selectedWords.push(w);
            });

          });
        });
      }
    }

    // set state for all the data we got
    this.setState({
      status_agregates,
      levelsOfConfidence,
      selectedWords,
      annotationTaskUserTweet,
      tweet,
      categories: validCategories,
      words,
      levelOfConfidenceId: annotationTaskUserTweet.levelOfConfidenceId,
      selectedCategory: validCategories[0]
    });
  }

  detectKey(event) {
    console.log(event)
    let selectedCategory = this.state.selectedCategory;
    if (event.keyCode === 27) {
      // escape was pressed
      this.setState({ showDimensionKeyboard: false, showWordsKeyboard: false });
    } else if (event.key == 'w') {
      if (!selectedCategory.clickedDimensionId) {
        this.props.showNotification('Choose Dimention First', 'error');
      } else {
        this.setState({ showDimensionKeyboard: false, showWordsKeyboard: true });
        this.wordKeyboardInput.focus();
      }
    } else if (event.key == 'ArrowDown') {
      this.setState({ showDimensionKeyboard: false, showWordsKeyboard: false });
      this.next(event);

    } else if (event.key == 'ArrowUp') {
      this.setState({ showDimensionKeyboard: false, showWordsKeyboard: false });
      this.back(event);
    } else if (event.key == 'd') {
      if (selectedCategory.dimensions && selectedCategory.dimensions.length) {
        this.setState({ showDimensionKeyboard: true, showWordsKeyboard: false });
        this.dimensionKeyboardInput.focus();
      }
    } else if (this.state.showWordsKeyboard || this.state.showDimensionKeyboard) {
      if (event.key == 'Enter') {

        if (this.state.showDimensionKeyboard) {
          if (!isNaN(this.dimensionKeyboardInput.value)) {
            let input = parseInt(this.dimensionKeyboardInput.value);
            if (input <= selectedCategory.dimensions.length) {
              if (input > 0) {
                selectedCategory.clickedDimensionId = selectedCategory.dimensions[input - 1].id;
              }
              this.saveAnnotation(selectedCategory,selectedCategory.clickedDimensionId);
            }
          }
        }
        else if (this.state.showWordsKeyboard) {
          if (!selectedCategory.selectedWords)
            selectedCategory.selectedWords = [];

          if (!isNaN(this.wordKeyboardInput.value)) {

            const inputs = this.wordKeyboardInput.value.split('.');
            let currentSelectedWords = [];

            for (let index in inputs) {
              const input = inputs[index];
              if (input <= this.state.words.length) {
                if (input > 0) {
                  //selecting
                  const word = this.state.words[input - 1];
                  word.color = selectedCategory.color;
                  currentSelectedWords.push(word);
                  selectedCategory.selectedWords.push(word);
                }
                // else if (input < 0) {
                // deselecting
                //   selectedCategory.selectedWords = selectedCategory.selectedWords.filter(x => x.id != this.state.words[-(input + 1)].id);
                // }
              }
            }

            if (currentSelectedWords && currentSelectedWords.length) {
              this.saveReason(selectedCategory, currentSelectedWords);
            }
            else {
              this.props.showNotification('Choose Words', 'error');
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    this.setState({ annotationTaskUserTweetId: this.props.id });
    this.fetchData(this.props.id);
    analytics.logPageView('Annotation');
    document.addEventListener("keyup", this.detectKey, false);

  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.detectKey, false);
  }
  componentDidUpdate(prevProps) {
    // handle refresh
    if (this.props.id !== prevProps.id) {
      this.fetchData(this.props.id);
      analytics.logPageView('Annotation');
    }
  }
  selectCategory(e, category, index) {
    e.preventDefault();
    this.setState({ selectedCategoryIndex: index, selectedCategory: category })
  }
  selectDimension(e, did) {
    //e.preventDefault();
    let selectedCategory = this.state.selectedCategory;
    let annotation = selectedCategory.annotations.find(x => x.dimensionId == did);

    if (did > 0) {
      console.log('selectDimension')
      if (selectedCategory.clickedDimensionId == did)
        selectedCategory.clickedDimensionId = 0;
      else
        selectedCategory.clickedDimensionId = did;
      this.setState({ selectedCategory: selectedCategory })

    }
  }

  handleDimensionChange = event => {
    let did = event.target.value;
    let selectedCategory = this.state.selectedCategory;
    event.stopPropagation();
    if (event.target.checked) {
      selectedCategory.clickedDimensionId = did;
      this.saveAnnotation(selectedCategory, did);
    }
    else {
      //alert("deleteAnnotation")
      this.deleteAnnotation(this.state.selectedCategory, did)
    }
    return false
  };
  next(e) {
    e.preventDefault();
    let index = this.state.selectedCategoryIndex;
    let s = this.state;
    if (index < s.categories.length - 1) {
      index++;
      this.setState({ selectedCategoryIndex: index, selectedCategory: s.categories[index] });
    }
  }

  deleteReason(currentCategory, selectedWords, word) {
    analytics.logEvent('Annotation - Reason', 'Delete');
    const { dataProvider, reset } = this.props;
    const { annotationTaskUserTweet } = this.state;

    fetchStart();
    dataProvider(DELETE, 'annotationreason', { id: word.annotationReasonId,userId:parseInt(annotationTaskUserTweet.userId) })
      .then(({ data }) => {
        this.setState({
          showDimensionKeyboard: false, showWordsKeyboard: false,
          selectedCategory: currentCategory,
          selectedWords: selectedWords
        });
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        fetchEnd();
      });
  }

  async fetchAnnotationTask(id, dataProvider) {
    // fetch annotationTaskUserTweet
    fetchStart();
    const { data: annotationTaskUserTweet } = await dataProvider(
      GET_ONE,
      'annotationTaskUserTweet',
      { id: id }
    ).finally(() => {
      // Dispatch an action letting react-admin know a API call has ended
      fetchEnd();
    });

    this.setState({ annotationTaskUserTweet });

    return annotationTaskUserTweet;
  }

  saveReason(selectedCategory, currentSelectedWords) {
    analytics.logEvent('Annotation - Reason', 'Save');
    const { dataProvider, reset } = this.props;
    const { annotationTaskUserTweet } = this.state;
    let annotation = selectedCategory.annotations.find(x => x.categoryId == selectedCategory.id && x.dimensionId == selectedCategory.clickedDimensionId);
    if (annotation && annotation.id > 0) {

      if (!annotation.annotationReasons)
        annotation.annotationReasons = []

      const annotationreason = {
        userId:parseInt(annotationTaskUserTweet.userId),
        annotationId: parseInt(annotation.id),
        categoryId: parseInt(selectedCategory.id),
        dimensionId: parseInt(selectedCategory.clickedDimensionId),
        annotationReasonWords: currentSelectedWords.map((tw, i) => {
          return {
            tweetWordId: tw.id
          }
        })
      };



      fetchStart();
      dataProvider(CREATE, 'annotationreason', { data: annotationreason })
        .then(({ data }) => {
          let selectedWords = this.state.selectedWords;
          currentSelectedWords.forEach(w => {
            w.annotationReasonId = data.id;
            w.categoryId = selectedCategory.id;
            w.dimensionId = selectedCategory.clickedDimensionId;
            selectedWords.push(w);
          });
          console.log(data)
          annotation.annotationReasons.push(data);
          this.setState({
            showDimensionKeyboard: false, showWordsKeyboard: false, selectedCategory: selectedCategory,
            selectedWords: selectedWords
          });
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          fetchEnd();
        });
    } else {
      this.props.showNotification('Select Dimention First', 'error');
    }
  }

  saveAnnotation(selectedCategory, dimensionId) {
    analytics.logEvent('Annotation - Dimention', 'Save');
    const { annotationTaskUserTweet } = this.state;
    let oldAnnotation = selectedCategory.annotations.find(x => x.categoryId == selectedCategory.id && x.dimensionId == dimensionId);

    if (dimensionId > 0 && !oldAnnotation) {
      const { dataProvider, reset } = this.props;
      if (!selectedCategory.annotations)
        selectedCategory.annotations = [];

     
      // get the data 
      const annotation = {
        //id: oldAnnotation ? parseInt(oldAnnotation.id) : 0,
        annotationTaskUserTweetId: annotationTaskUserTweet.id,
        annotationTaskId: annotationTaskUserTweet.annotationTaskId,
        categoryId: parseInt(selectedCategory.id),
        dimensionId: parseInt(dimensionId)
      };
      // make the request
      fetchStart();
      dataProvider(CREATE, 'annotation', { id: annotation.id, data: annotation })
        .then(({ data }) => {
          selectedCategory.annotations.push(data);
          this.fetchAnnotationTask(this.state.annotationTaskUserTweetId, dataProvider);
          this.setState({ showDimensionKeyboard: false, showWordsKeyboard: false, selectedCategory: selectedCategory });

        })
        .catch((error) => {
          //console.log(error)
          this.props.showNotification(error.message);
        })
        .finally(() => {
          fetchEnd();
        });
    }
  }


  back(e) {
    e.preventDefault();
    let index = this.state.selectedCategoryIndex;
    if (index > 0) {
      index--;
      this.setState({ selectedCategoryIndex: index, selectedCategory: this.state.categories[index] });
    }
  }

  renderCategory(category, index) {
    var completed = this.state.selectedCategory.id == category.id ? "completed" : null;
    var selected = this.state.selectedCategory.id == category.id ? "selected" : null;
    return <li completed={completed} key={'category' + category.id} selectedItem={selected}>
      <a href="#" onClick={(e) => this.selectCategory(e, category, index)} style={{ position: "relative" }}>
        <span className="step justify-content-between full-row">
          <div className={'d-flex align-items-center'}>
            <Color category={category} />
            <span>{category.name}</span>
          </div>
          {category.annotations && category.annotations.length > 0 &&
            <span className="sp-dimension-selected"><DoneIcon /></span>}

        </span></a>
    </li>
  }



  selectSentenceOrWord = (e, word, index) => {
    e.preventDefault();
    const { chooseSentence } = this.state;
    if (!chooseSentence) {
      return this.selectWord(word);
    } else {
      return this.selectSentence(e, word, index);
    }
  }

  saveSentence = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }

    const { possibleSentence, selectedCategory } = this.state;
    if (!selectedCategory.selectedWords) {
      selectedCategory.selectedWords = []
    }

    let currentSelectedWords = [];
    for (let id in possibleSentence) {
      const item = possibleSentence[id];
      const word = item.word;

      word.color = selectedCategory.color;
      currentSelectedWords.push(word);
      selectedCategory.selectedWords.push(word);
    }

    if (currentSelectedWords && currentSelectedWords.length) {
      this.saveReason(selectedCategory, currentSelectedWords);
      this.clearSentence();
    } else {
      this.props.showNotification('no selected words', 'error');
    }
  }

  clearSentence = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!this.state.minMaxSentenceIndexes) return;
    const chipelts = document.querySelectorAll('.possible-sentence');
    for (var i = 0; i < chipelts.length; i++) {
      const chipelt = chipelts[i];
      chipelt.style.color = '';
      chipelt.classList.remove('possible-sentence');
    }
    this.setState({ possibleSentence: {}, minMaxSentenceIndexes: null });
  }

  selectSentence = (e, word, index) => {
    //console.log(word, index); // {id: 654260, index: 2, name: "watan"}  // 1
    //goal: we want to make this look as follow { 654260: {word: {id: 654260, index: 2, name: "watan"}, indexArr: 1}, ...}
    const { possibleSentence, minMaxSentenceIndexes } = this.state;
    // check if not added before to add it now
    const idsInPossibleSentence = Object.keys(possibleSentence);
    if ((idsInPossibleSentence).indexOf(word.id) === -1) {
      let changes = {
        possibleSentence: {
          ...possibleSentence,
          [word.id]: { word, indexArr: index }
        }
      };
      // set default value for min and max of sentence. first word choice
      if (!minMaxSentenceIndexes) {
        changes.minMaxSentenceIndexes = { min: index, max: index };
      } else {
        // not first word => should make sure words are consequitive
        if ((minMaxSentenceIndexes.min - 1) != index && (minMaxSentenceIndexes.max + 1) != index) {
          this.props.showNotification('Sentence words should be consequitive', 'error');
          return;
        }
        if ((minMaxSentenceIndexes.min - 1) == index) {
          changes.minMaxSentenceIndexes = { ...minMaxSentenceIndexes, min: index };
        }
        if ((minMaxSentenceIndexes.max + 1) == index) {
          changes.minMaxSentenceIndexes = { ...minMaxSentenceIndexes, max: index };
        }
      }
      // show a color change
      const { selectedCategory } = this.state;

      const chipelt = document.querySelectorAll('[chipid="' + word.id + '"]')[0];
      chipelt.style.color = selectedCategory.color;
      chipelt.classList.add('possible-sentence');

      this.setState(changes, () => { console.log(possibleSentence) });
    }
  }

  selectWord(word) {
    let selectedCategory = this.state.selectedCategory;
    if (selectedCategory.clickedDimensionId > 0) {

      if (!selectedCategory.selectedWords) {
        selectedCategory.selectedWords = []
      }
      word.color = selectedCategory.color;
      selectedCategory.selectedWords.push(word);
      console.log(word);
      let currentSelectedWords = [];
      currentSelectedWords.push(word);
      this.saveReason(selectedCategory, currentSelectedWords)
    } else {
      this.props.showNotification('Choose Category/Dimention First', 'error');
    }
    //this.setState({ selectedCategory: selectedCategory });
  }

  deSelectWord(e, word, index) {
    e.preventDefault();
    if (this.state.chooseSentence) {
      this.props.showNotification('Invalid Operation', 'error');
      return;
    }
    let currentCategory = this.state.categories.filter(x => x.id == word.categoryId)[0];
    if (!currentCategory.selectedWords) {
      currentCategory.selectedWords = []
    }
    currentCategory.selectedWords = currentCategory.selectedWords.filter(x => x.id != word.id);
    let selectedWords = this.state.selectedWords;
    selectedWords = selectedWords.filter(x => x.id != word.id && x.dimensionId == currentCategory.clickedDimensionId);
    this.deleteReason(currentCategory, selectedWords, word)

  }

  renderChip(word, index) {
    let contains = false;
    //let selectedWords = this.state.selectedWords;
    let selectedWords =this.state.selectedCategory &&  this.state.selectedCategory.clickedDimensionId >0 && this.state.selectedWords  ?
     this.state.selectedWords.filter(x => x.categoryId == this.state.selectedCategory.id && this.state.selectedCategory.clickedDimensionId == x.dimensionId) : [];
    let selectedWord = {};
    for (let w in selectedWords) {
      if (selectedWords[w].id == word.id) {
        selectedWord = selectedWords[w];
        contains = true;
        break;
      }
    }

    let wordStyle = {};
    if (contains) wordStyle.backgroundColor = selectedWord.color;

    return (
      <div chipid={word.id} className={`my-chip ${(contains) ? 'selected-word' : 'outlined'}`}
        style={wordStyle}
        onClick={(e) => { return (contains) ? this.deSelectWord(e, selectedWord, index) : this.selectSentenceOrWord(e, word, index) }}
       // onClick={(e) => { this.selectSentenceOrWord(e, word, index); }}
      >
        <span className="chip-text">
          {word.name}
        </span>
        <div className="index-circle">{word.index}</div>
      </div>
    )

  }

  handleDeleteAnnotation = () => {
    this.deleteAnnotation(this.state.selectedCategory);
  }

  deleteAnnotation(currentCategory, did) {
    console.log('deleteAnnotation')
    analytics.logEvent('Annotation', 'Delete');
    const { dataProvider, reset } = this.props;
    let annotation = currentCategory.annotations.find(x => x.categoryId == currentCategory.id && x.dimensionId == did);

    //if (annotation) {
    fetchStart();
    dataProvider(DELETE, 'annotation', { id: annotation.id,userId:parseInt(this.state.annotationTaskUserTweet.userId) })
      .then(({ data }) => {
        let selectedWords = this.state.selectedWords.filter(x => x.categoryId != currentCategory.id && x.dimensionId == did);
        currentCategory.annotations = currentCategory.annotations.filter(x => x.id != annotation.id);
        currentCategory.selectedWords = [];

        currentCategory.clickedDimensionId = 0;

        this.setState({
          selectedCategory: currentCategory, selectedWords: selectedWords
        });
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        fetchEnd();
      });
    //}
  }

  handleKeys(key, e) {
    if (key == 'up')
      this.back(e);
    else if (key == 'down')
      this.next(e);
  }

  // handleDimensionClick = event => {
  //   let selectedCategory = this.state.selectedCategory;
  //   selectedCategory.clickedDimensionId = event.target.value;   
  //   this.setState({ selectedCategory: selectedCategory });
  // };

  handleLevelConfidenceChange = event => {
    this.setState({ levelOfConfidenceId: event.target.value });
  };
  handleIsIrrelevantChange = event => {
    console.log(event.target.checked)
    this.setState({ isIrrelevant: event.target.checked });
  };

  handleFinishCloseClick = () => {
    this.setState({ showFinishPopUp: false });
  }

  handleFinishOpenClick = () => {
    this.setState({ showFinishPopUp: true });
  }

  handleFinishSaveClick = values => {
    if (!this.state.levelOfConfidenceId) {
      this.props.showNotification('Please Choose Confidence', 'error');
    } else {
      const { dataProvider } = this.props;
      analytics.logEvent('Annotation - Finish', 'Save');
      // Dispatch an action letting react-admin know a API call is ongoing
      fetchStart();
      // As we want to know when the new post has been created in order to close the modal, we use the
      dataProvider(UPDATE, 'AnnotationTaskUserTweet',
        {
          id: this.state.annotationTaskUserTweetId, data: {
            isIrrelevant: this.state.isIrrelevant,
            levelOfConfidenceId: parseInt(this.state.levelOfConfidenceId)
          }
        })
        .then(({ data }) => {
          // Update the main react-admin form (in this case, the comments creation form)
          //change(REDUX_FORM_NAME, 'post_id', data.id);
          this.setState({ showFinishPopUp: false });

          localStorage.nextAnnotationId = data.nextAnnotationId;
          let redirect = `#/annotationTaskUserTweet/${data.nextAnnotationId}`
          window.location.href = redirect;
          window.location.reload();
        })
        .catch(error => {
          this.props.showNotification('An Error occured', 'error');
        })
        .finally(() => {
          // Dispatch an action letting react-admin know a API call has ended
          fetchEnd();
        });
    }
  };

  renderHeaderCard = () => {
    return (
      <div className={'sp-card-like full-row'}>
        <div className={"instructions"}>
          <div className={'sp-align-content-sides'}>
            <div className={'sp-align-right'}>
              <span is-upgraded="" className="title">
                <span>{this.props.translate('resources.annotations.taskNumber')}</span>
                <span>{this.state.annotationTaskUserTweet.id}</span>
              </span>
              &nbsp; &nbsp;
              <span className={"desc"}>
                {this.state.annotationTaskUserTweet.userName}
              </span>
            </div>
            <div className={'sp-align-left'}>
              <span className={'mx-5px'} style={{ position: 'relative' }}>
                {<Status status={this.state.annotationTaskUserTweet.status} translate={this.props.translate} />}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderFinishCard = () => {
    return (
      <span className={'finish-span'}>
        {this.state.annotationTaskUserTweet.status == 20 &&
          <Button size="small" onClick={this.handleFinishOpenClick} color="primary" variant="contained" >
            {this.props.translate('resources.annotations.taskDone')}
                  &nbsp;
                  <CloudDone />
          </Button>
        }
        <Dialog
          fullWidth
          open={this.state.showFinishPopUp}
          onClose={this.handleCloseClick}
          aria-label={this.state.annotationTaskUserTweet.id}
        >
          <DialogTitle>{this.props.translate('resources.annotations.taskDone')}</DialogTitle>
          <DialogContent>
            <div>
              <div>{this.props.translate('resources.annotations.confidence')}</div>
              <FormControl component="fieldset" >
                <RadioGroup
                  aria-label="Level"
                  name="level1"
                  // className={classes.group}
                  value={this.state.levelOfConfidenceId + ''}
                  onChange={this.handleLevelConfidenceChange}
                >
                  {this.state.levelsOfConfidence.map((c, i) => (
                    <FormControlLabel value={c.id + ''} control={<Radio />} label={c.name} />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            {/* <div>
                      <div>                        
                        إذا كان المحتوى غير ملائم إختر ذلك
                        </div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.isIrrelevant}
                            onChange={this.handleIsIrrelevantChange}
                            color="primary"
                          />
                        }
                        label="غير ملائم"
                      />
                    </div> */}


          </DialogContent>
          <DialogActions>
            <SaveButton
              saving={this.state.isSubmitting}
              onClick={this.handleFinishSaveClick}
            />
            <Button label="ra.action.cancel" onClick={this.handleFinishCloseClick}>
              <IconCancel />
            </Button>
          </DialogActions>
        </Dialog>
      </span>

    );
  }

  renderLevelCard = (index) => {
    return (
      <div className={'sp-level-container'} style={{ marginTop: '22px' }}>
        <Card>
          <CardHeader
            title={this.props.translate('resources.annotations.confidence')}
            subheader=""
          />
          <CardContent style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }}>

            <div className="levelCard">
              <div>
                <FormControl component="fieldset" >
                  <RadioGroup
                    aria-label="Level"
                    name="level1"
                    // className={classes.group}
                    value={this.state.levelOfConfidenceId + ''}
                    onChange={this.handleLevelConfidenceChange}
                  >
                    {this.state.levelsOfConfidence.map((c, i) => (
                      <FormControlLabel value={c.id + ''} control={<Radio />} label={c.name} style={{ marginLeft: '0px' }} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
              <div>
                {this.state.annotationTaskUserTweet.status == 20 &&
                  <Button size="small" onClick={this.handleFinishSaveClick} disabled={!this.state.levelOfConfidenceId} color="primary" variant="contained" style={{ margin: '10px' }} >
                    {this.props.translate('resources.annotations.taskDone')}
                  &nbsp;
                  <CloudDone />
                  </Button>
                }
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  renderCategoriesCard = (index) => {
    return (
      <div id="drawer">
        <div className="steps">
          <ol>
            {this.state.categories.map(c => (
              this.renderCategory(c, index++)
            ))}

          </ol>
          {/* {this.renderFinishCard()} */}
        </div>
      </div>
    );
  }

  renderDimensionCard = (selectedCategory, index, classes) => {

    return (
      <div className={'sp-dimension-container'} style={{ marginTop: '22px'}}>
        {selectedCategory.id > 0 &&
          <Card  >
            <CardHeader
              title={selectedCategory.name}
            />
            <CardContent style={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0, paddingLeft: 0 }}>
              <div style={{marginRight: '10px', marginLeft: '10px',position:"relative" }}>
              {this.state.showDimensionKeyboard && <input ref={(input) => { this.dimensionKeyboardInput = input; }} type="number"   style={{ width: '32px', }} />}
              </div>
              <div>
                {selectedCategory.dimensions.map((d, i) => {
                  let selected = selectedCategory.clickedDimensionId == d.id ? "selected" : null;
                  let checkedDimension = selectedCategory.annotations.find(x => x.dimensionId == d.id);
                  let checked = false;
                  if (checkedDimension)
                    checked = true;
                  return (<div className="dimensionitem" checkedItem={checked ? 'checkedItem' : null}
                    selectedItem={selected}
                    onClick={(e) => checked ? this.selectDimension(e, d.id, index) : null}
                    style={{ position: "relative" }}>
                    <Checkbox
                      value={d.id}
                      checked={checked}
                      onChange={this.handleDimensionChange}
                      color="primary" />
                    <span className="dimensionLabel">
                      {(i + 1) + '. ' + d.name}
                    </span>
                  </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        }
      </div>
    );
  }

  changeChoosingType = (event, sentence) => {
    event.preventDefault();
    if (!sentence) this.clearSentence();
    if (this.state.chooseSentence != sentence) {
      this.setState({ chooseSentence: sentence });
    }
  }

  renderReasonsCard = (selectedCategory, wordIndex) => {
    const { possibleSentence, chooseSentence } = this.state;
    const sentenceCount = (chooseSentence) ? Object.keys(possibleSentence).length : 0;

    return (
      <div id="main">
        <div id="steps">
          <div label="Google Colaboratory quick start" className="google-codelab-step" duration="4" step="2"
            selectedtweet="selected" style={{ "transform": "translate3d(0px, 0px, 0px);" }}>
            <div className="instructions">
              <div className="inner">
                {selectedCategory.id > 0 &&
                  <div>
                    <h2 is-upgraded="" className="step-title">
                      <div className={'d-flex align-items-center justify-content-between'}>
                        <span>{this.props.translate('resources.annotations.text')}  </span>
                        <div className={'d-flex fontsize-90P sp-choose-word-sentence-container'}>
                          <span>
                            <a onClick={(e) => this.changeChoosingType(e, false)} href="/#" className={!this.state.chooseSentence && 'active'}> <TouchApp /> إختر كلمة </a>
                          </span>
                          <span className={'d-flex align-items-center'}>
                            <a onClick={(e) => this.changeChoosingType(e, true)} href="/#" className={this.state.chooseSentence && 'active'}><TouchApp /> إختر جملة </a>
                            <span style={{ margin: "0 10px" }} className={`cursor-pointer sp-green-color ${(sentenceCount > 1) ? '' : 'd-none'}`} onClick={e => this.saveSentence(e)}><CheckIcon /></span>
                            <span style={{ margin: "0 10px" }} className={`cursor-pointer sp-red-color ${(sentenceCount > 0) ? '' : 'd-none'}`} onClick={e => this.clearSentence(e)}><ClearIcon /></span>
                          </span>
                        </div>
                      </div>
                      {/* <div className="subtexttitle"> رقم الكلمة + w إضغط</div> */}
                      {this.state.showWordsKeyboard && <input ref={(input) => { this.wordKeyboardInput = input; }} type="number" className="keyboard-words" />}
                    </h2>
                    <p>
                      {this.state.words.map(c => (
                        this.renderChip(c, wordIndex++)
                      ))}
                    </p>
                    <p>
                      {this.state.tweet && <TweetText source='text' record={this.state.tweet}></TweetText>}
                    </p>
                    {/* <p>
                      {this.state.tweet && this.state.tweet.tweetId}
                    </p> */}
                    {/* <div>
                      {this.state.selectedCategory.clickedDimensionId > 0 && this.state.selectedCategory.annotations.filter(x => x.dimensionId == this.state.selectedCategory.clickedDimensionId).map(a => (
                        a.annotationReasons && a.annotationReasons.map(r => (
                          <div>
                            {r.annotationReasonWords && r.annotationReasonWords.map(w => (
                              <div>
                                {w.tweetWordId}  -- {this.state.words.find(x => x.id == w.tweetWordId) ? this.state.words.find(x => x.id == w.tweetWordId).name : ''}
                              </div>
                            ))}
                          </div>
                        ))
                      ))}
                    </div> */}
                  </div>
                }
                {/* {selectedCategory.id == -1 &&
                  <div>  <h2> إضغط على إنهاء لإتمام المهمة </h2> </div>
                } */}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  renderStatisticsCard = () => {
    let doneTasks = 0;
    let remainingTasks = 0;
    let donePercentageTasks = 0;
    let duration = 0;
    const status_agregates = this.state.status_agregates;
    if (status_agregates) {
      let doneRecord = status_agregates.filter(x => x.status == 30)[0]
      if (doneRecord) {
        doneTasks = doneRecord.totalTasks;

        let allTasks = 0;

        for (let i = 0; i < status_agregates.length; i++) {
          allTasks += status_agregates[i].totalTasks;
        }
        remainingTasks = allTasks - doneTasks;
        duration = (doneRecord.totalTaskDuration / 60).toFixed(2);
        donePercentageTasks = doneRecord.percentage.toFixed(2);
      }
    }
    return (
      <div className={'sp-card-like full-row'}>
        <div className={"instructions"}>
          <div className={'sp-align-content-center'}>

            <div className={'sp-stat-container'}>
              <div className={'sp-stat-value'}>{doneTasks}
              </div>
              <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.tweetDone')}</div>
            </div>

            <div className={'sp-stat-container'}>
              <div className={'sp-stat-value'}>{remainingTasks}</div>
              <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.tweetRemaining')}</div>
            </div>

            <div className={'sp-stat-container'}>
              <div className={'sp-stat-value'}>{donePercentageTasks}%</div>
              <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.donePercentage')} </div>
            </div>

            <div className={'sp-stat-container'}>
              <div className={'sp-stat-value'}>{duration}</div>
              <div className={'sp-stat-title'}>{this.props.translate('resources.statistics.workMinutes')}  </div>
            </div>

            {/* <div className={'sp-stat-container'}>
              <div className={'sp-stat-value'}>0</div>
              <div className={'sp-stat-title'}>كلمة مختارة  </div>
            </div> */}

          </div>
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const redirect = this.state.redirect;
    let selectedCategory = this.state.selectedCategory;
    let selectedCategoryIndex = this.state.selectedCategoryIndex;
    let index = 0;
    let wordIndex = 0;
    return (
      this.state.annotationTaskUserTweet && this.state.categories && this.state.categories.length > 0 ?
        <div style={{ backgroundColor: '#f5f5f5', padding: 20 }} >
          <div className="annotation-form google-codelab">
            {redirect != null ? <Redirect to={redirect} /> :
              <>  {this.renderHeaderCard()}
                {this.renderLevelCard(index)}
                {this.renderCategoriesCard(index)}
                {this.renderDimensionCard(selectedCategory, index, classes)}
                {this.renderReasonsCard(selectedCategory, wordIndex)}
                {this.renderStatisticsCard()}
              </>}
          </div>
        </div>
        : <div>
          <span>
            <CircularProgress />
          </span>
        </div>

    )
  }
}
const mapStateToProps = state => ({
  version: state.admin.ui.viewVersion,
});

const mapDispatchToProps = {
  change,
  reset,
  fetchEnd,
  fetchStart,
  showNotification,
  submit
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withDataProvider,
  translate,
  withStyles(styles)
);

export default enhance(AnnotationForm);