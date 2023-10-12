/**
 * @file src/types/common.d.ts
 * @description 公共类型定义
 * @since 1.0.0
 */

/**
 * @description 公共 namespace
 * @since 1.0.0
 * @namespace MuBot.Common
 * @memberof MuBot
 */
declare namespace MuBot.Common {
  /**
   * @description 公共数据结构 - issue
   * @since 1.0.0
   * @interface Issue
   * @property {string} url issue url
   * @property {string} repository_url 仓库 url
   * @property {string} labels_url labels url
   * @property {string} comments_url comments url
   * @property {string} events_url events url
   * @property {string} html_url html url
   * @property {number} id issue id
   * @property {string} node_id issue node id
   * @property {number} number issue number
   * @property {string} title issue 标题
   * @property {User} user issue 创建者
   * @property {string[]} labels issue 标签
   * @property {string} state issue 状态 // todo: 后续换成枚举
   * @property {boolean} locked issue 是否锁定
   * @property {unknown} assignee issue 负责人 // todo: 待完善
   * @property {unknown[]} assignees issue 负责人列表 // todo: 待完善
   * @property {unknown} milestone issue 里程碑 // todo: 待完善
   * @property {number} comments issue 评论数
   * @property {string} created_at issue 创建时间
   * @property {string} updated_at issue 更新时间
   * @property {string} closed_at issue 关闭时间
   * @property {string} author_association issue 作者关联 // todo: 后续换成枚举
   * @property {string} active_lock_reason issue 锁定原因
   * @property {string} body issue 内容
   * @property {Reactions} reactions 交互数据
   * @property {string} timeline_url issue 时间线 url
   * @property {string} performed_via_github_app issue github app url
   * @property {string} state_reason issue 状态原因
   * @return Issue
   */
  interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: User;
    labels: string[];
    state: string;
    locked: boolean;
    assignee: unknown;
    assignees: unknown[];
    milestone: unknown;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    author_association: string;
    active_lock_reason: string;
    body: string;
    reactions: Reactions;
    timeline_url: string;
    performed_via_github_app: string;
    state_reason: string;
  }

  /**
   * @description 公共数据结构 - user
   * @since 1.0.0
   * @interface User
   * @property {string} login 用户名
   * @property {number} id 用户 id
   * @property {string} node_id 用户 node id
   * @property {string} avatar_url 用户头像 url
   * @property {string} gravatar_id 用户 gravatar id
   * @property {string} url 用户 url
   * @property {string} html_url 用户 html url
   * @property {string} followers_url 用户 followers url
   * @property {string} following_url 用户 following url
   * @property {string} gists_url 用户 gists url
   * @property {string} starred_url 用户 starred url
   * @property {string} subscriptions_url 用户 subscriptions url
   * @property {string} organizations_url 用户 organizations url
   * @property {string} repos_url 用户 repos url
   * @property {string} events_url 用户 events url
   * @property {string} received_events_url 用户 received events url
   * @property {string} type 用户类型 // todo: 后续换成枚举
   * @property {boolean} site_admin 是否是管理员
   * @return User
   */
  interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  }

  /**
   * @description 公共数据结构 - reactions
   * @since 1.0.0
   * @interface Reactions
   * @property {number} url reactions url
   * @property {number} total_count reactions 总数
   * @property {number} "+1" reactions +1 数量
   * @property {number} "-1" reactions -1 数量
   * @property {number} laugh reactions laugh 数量
   * @property {number} hooray reactions hooray 数量
   * @property {number} confused reactions confused 数量
   * @property {number} heart reactions heart 数量
   * @property {number} rocket reactions rocket 数量
   * @property {number} eyes reactions eyes 数量
   * @return Reactions
   */
  interface Reactions {
    "url": string;
    "total_count": number;
    "+1": number;
    "-1": number;
    "laugh": number;
    "hooray": number;
    "confused": number;
    "heart": number;
    "rocket": number;
    "eyes": number;
  }

  /**
   * @description 公共数据结构 - comment
   * @since 1.0.0
   * @interface Comment
   * @property {string} url comment url
   * @property {string} html_url comment html url
   * @property {string} issue_url comment issue url
   * @property {number} id comment id
   * @property {string} node_id comment node id
   * @property {User} user comment 创建者
   * @property {string} created_at comment 创建时间
   * @property {string} updated_at comment 更新时间
   * @property {string} author_association comment 作者关联 // todo: 后续换成枚举
   * @property {string} body comment 内容
   * @property {Reactions} reactions 交互数据
   * @property {string} performed_via_github_app comment github app url
   * @return Comment
   */
  interface Comment {
    url: string;
    html_url: string;
    issue_url: string;
    id: number;
    node_id: string;
    user: User;
    created_at: string;
    updated_at: string;
    author_association: string;
    body: string;
    reactions: Reactions;
    performed_via_github_app: string;
  }

  /**
   * @description 公共数据结构 - repository
   * @since 1.0.0
   * @interface Repository
   * @property {number} id 仓库 id
   * @property {string} node_id 仓库 node id
   * @property {string} name 仓库名
   * @property {string} full_name 仓库全名
   * @property {boolean} private 是否是私有仓库
   * @property {User} owner 仓库拥有者
   * @property {string} html_url 仓库 html url
   * @property {string} description 仓库描述
   * @property {boolean} fork 是否是 fork 仓库
   * @property {string} url 仓库 url
   * @property {string} forks_url 仓库 forks url
   * @property {string} keys_url 仓库 keys url
   * @property {string} collaborators_url 仓库 collaborators url
   * @property {string} teams_url 仓库 teams url
   * @property {string} hooks_url 仓库 hooks url
   * @property {string} issue_events_url 仓库 issue events url
   * @property {string} events_url 仓库 events url
   * @property {string} assignees_url 仓库 assignees url
   * @property {string} branches_url 仓库 branches url
   * @property {string} tags_url 仓库 tags url
   * @property {string} blobs_url 仓库 blobs url
   * @property {string} git_tags_url 仓库 git tags url
   * @property {string} git_refs_url 仓库 git refs url
   * @property {string} trees_url 仓库 trees url
   * @property {string} statuses_url 仓库 statuses url
   * @property {string} languages_url 仓库 languages url
   * @property {string} stargazers_url 仓库 stargazers url
   * @property {string} contributors_url 仓库 contributors url
   * @property {string} subscribers_url 仓库 subscribers url
   * @property {string} subscription_url 仓库 subscription url
   * @property {string} commits_url 仓库 commits url
   * @property {string} git_commits_url 仓库 git commits url
   * @property {string} comments_url 仓库 comments url
   * @property {string} issue_comment_url 仓库 issue comment url
   * @property {string} contents_url 仓库 contents url
   * @property {string} compare_url 仓库 compare url
   * @property {string} merges_url 仓库 merges url
   * @property {string} archive_url 仓库 archive url
   * @property {string} downloads_url 仓库 downloads url
   * @property {string} issues_url 仓库 issues url
   * @property {string} pulls_url 仓库 pulls url
   * @property {string} milestones_url 仓库 milestones url
   * @property {string} notifications_url 仓库 notifications url
   * @property {string} labels_url 仓库 labels url
   * @property {string} releases_url 仓库 releases url
   * @property {string} deployments_url 仓库 deployments url
   * @property {string} created_at 仓库创建时间
   * @property {string} updated_at 仓库更新时间
   * @property {string} pushed_at 仓库推送时间
   * @property {string} git_url 仓库 git url
   * @property {string} ssh_url 仓库 ssh url
   * @property {string} clone_url 仓库 clone url
   * @property {string} svn_url 仓库 svn url
   * @property {string} homepage 仓库主页
   * @property {number} size 仓库大小
   * @property {number} stargazers_count 仓库 stargazers 数量
   * @property {number} watchers_count 仓库 watchers 数量
   * @property {string} language 仓库语言
   * @property {boolean} has_issues 是否有 issues
   * @property {boolean} has_projects 是否有 projects
   * @property {boolean} has_downloads 是否有 downloads
   * @property {boolean} has_wiki 是否有 wiki
   * @property {boolean} has_pages 是否有 pages
   * @property {boolean} has_discussions 是否有 discussions
   * @property {number} forks_count 仓库 forks 数量
   * @property {string} mirror_url 仓库 mirror url
   * @property {boolean} archived 是否是 archived 仓库
   * @property {boolean} disabled 是否是 disabled 仓库
   * @property {number} open_issues_count 仓库 open issues 数量
   * @property {LICENSE} license 仓库 license
   * @property {boolean} allow_forking 是否允许 fork
   * @property {boolean} is_template 是否是 template
   * @property {boolean} web_commit_signoff_required 是否需要 web commit 签名
   * @property {string[]} topics 仓库 topics
   * @property {string} visibility 仓库可见性 // todo: 后续换成枚举
   * @property {number} forks 仓库 forks 数量
   * @property {number} open_issues 仓库 open issues 数量
   * @property {number} watchers 仓库 watchers 数量
   * @property {string} default_branch 仓库默认分支
   * @return Repository
   */
  interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: User;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: LICENSE;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
  }

  /**
   * @description 公共数据结构 - LICENSE
   * @since 1.0.0
   * @interface LICENSE
   * @property {string} key license key
   * @property {string} name license 名称
   * @property {string} spdx_id license spdx id
   * @property {string} url license url
   * @property {string} node_id license node id
   * @return LICENSE
   */
  interface LICENSE {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  }

  /**
   * @description 公共数据结构 - installation
   * @since 1.0.0
   * @interface Installation
   * @property {number} id 安装 id
   * @property {string} node_id 安装 node id
   * @return Installation
   */
  interface Installation {
    id: number;
    node_id: string;
  }
}
