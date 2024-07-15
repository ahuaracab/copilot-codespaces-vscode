function skillsMember() {
  let member = document.querySelector('.member');

  if (member) {
    let memberSkills = member.querySelectorAll('.skill');
    let memberSkillsArr = Array.from(memberSkills);

    memberSkillsArr.forEach((skill, index) => {
      if (index <= 2) {
        skill.classList.add('show');
      }
    });

    let showMore = document.createElement('div');
    showMore.classList.add('show-more');
    showMore.innerHTML = 'Show More';
    member.appendChild(showMore);

    showMore.addEventListener('click', () => {
      memberSkillsArr.forEach((skill, index) => {
        if (index > 2) {
          skill.classList.toggle('show');
        }
      });

      if (showMore.innerHTML === 'Show More') {
        showMore.innerHTML = 'Show Less';
      } else {
        showMore.innerHTML = 'Show More';
      }
    });
  }
}